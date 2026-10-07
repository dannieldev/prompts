import { PromptInput, PromptItem } from "../types";
import { SEED_PROMPTS } from "./seedData";

const STORAGE_KEY = "dannieldev_prompts_vault_v1";

const DEPRECATED_IDS = new Set([
  "seed-12-gamma-laboratorios-onboarding",
  "seed-14-gamma-laboratorios-calendario-paso-2",
]);

function sanitizePrompts(items: PromptItem[]): PromptItem[] {
  return items.filter(
    (p) =>
      !DEPRECATED_IDS.has(p.id) &&
      !p.title?.toLowerCase().includes("gamma laboratorios") &&
      !p.tags?.some((t) => t.toLowerCase().includes("gamma-laboratorios"))
  );
}

// Helper to get local storage prompts
function getLocalPrompts(): PromptItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROMPTS));
      return SEED_PROMPTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const sanitized = sanitizePrompts(parsed);
      const existingIds = new Set(sanitized.map((p) => p.id));
      const missingSeeds = SEED_PROMPTS.filter((s) => !existingIds.has(s.id));
      const merged = [...sanitized, ...missingSeeds];
      if (sanitized.length !== parsed.length || missingSeeds.length > 0) {
        saveLocalPrompts(merged);
      }
      return merged;
    }
    return SEED_PROMPTS;
  } catch {
    return SEED_PROMPTS;
  }
}

function saveLocalPrompts(prompts: PromptItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  } catch (e) {
    console.error("No se pudo guardar en almacenamiento local:", e);
  }
}

export type StorageMode = "d1" | "local";

class PromptApiClient {
  private mode: StorageMode = "local";
  private onModeChangeCallback?: (mode: StorageMode) => void;

  public setOnModeChange(cb: (mode: StorageMode) => void) {
    this.onModeChangeCallback = cb;
  }

  public getMode(): StorageMode {
    return this.mode;
  }

  private setMode(mode: StorageMode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.onModeChangeCallback?.(mode);
    }
  }

  async getAllPrompts(): Promise<PromptItem[]> {
    try {
      const resp = await fetch("/api/prompts", { signal: AbortSignal.timeout(3500) });
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) {
          this.setMode("d1");
          const sanitized = sanitizePrompts(data);
          // If remote D1 is empty, auto-seed it with the rich seed prompts
          if (sanitized.length === 0) {
            await this.seedRemote();
            return SEED_PROMPTS;
          }
          saveLocalPrompts(sanitized);
          return sanitized;
        }
      }
    } catch {
      // Worker API not reachable, switch to local mode
    }

    this.setMode("local");
    return getLocalPrompts();
  }

  async createPrompt(input: PromptInput): Promise<PromptItem> {
    if (this.mode === "d1") {
      try {
        const resp = await fetch("/api/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          signal: AbortSignal.timeout(4000),
        });
        if (resp.ok) {
          const created = await resp.json();
          const local = getLocalPrompts();
          saveLocalPrompts([created, ...local]);
          return created;
        }
      } catch (err) {
        console.warn("Fallo al crear en D1, guardando localmente:", err);
      }
    }

    // Local fallback
    const id = "prompt_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();
    const newPrompt: PromptItem = {
      id,
      title: input.title.trim(),
      description: input.description.trim(),
      content: input.content,
      category: input.category,
      tags: input.tags,
      models: input.models,
      is_favorite: Boolean(input.is_favorite),
      created_at: now,
      updated_at: now,
    };

    const list = getLocalPrompts();
    const updated = [newPrompt, ...list];
    saveLocalPrompts(updated);
    return newPrompt;
  }

  async updatePrompt(id: string, input: Partial<PromptInput>): Promise<PromptItem> {
    if (this.mode === "d1") {
      try {
        const resp = await fetch(`/api/prompts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          signal: AbortSignal.timeout(4000),
        });
        if (resp.ok) {
          const updated = await resp.json();
          const local = getLocalPrompts().map((p) => (p.id === id ? updated : p));
          saveLocalPrompts(local);
          return updated;
        }
      } catch (err) {
        console.warn("Fallo al actualizar en D1, guardando localmente:", err);
      }
    }

    // Local fallback
    const list = getLocalPrompts();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Prompt no encontrado");

    const existing = list[index];
    const updated: PromptItem = {
      ...existing,
      ...input,
      title: input.title !== undefined ? input.title.trim() : existing.title,
      description: input.description !== undefined ? input.description.trim() : existing.description,
      updated_at: new Date().toISOString(),
    };

    list[index] = updated;
    saveLocalPrompts(list);
    return updated;
  }

  async deletePrompt(id: string): Promise<void> {
    if (this.mode === "d1") {
      try {
        await fetch(`/api/prompts/${id}`, {
          method: "DELETE",
          signal: AbortSignal.timeout(4000),
        });
      } catch (err) {
        console.warn("Fallo al borrar en D1:", err);
      }
    }

    const list = getLocalPrompts().filter((p) => p.id !== id);
    saveLocalPrompts(list);
  }

  async toggleFavorite(id: string): Promise<boolean> {
    if (this.mode === "d1") {
      try {
        const resp = await fetch(`/api/prompts/${id}/favorite`, {
          method: "POST",
          signal: AbortSignal.timeout(4000),
        });
        if (resp.ok) {
          const data = await resp.json();
          const list = getLocalPrompts().map((p) =>
            p.id === id ? { ...p, is_favorite: data.is_favorite } : p
          );
          saveLocalPrompts(list);
          return data.is_favorite;
        }
      } catch (err) {
        console.warn("Fallo al alternar favorito en D1:", err);
      }
    }

    // Local fallback
    const list = getLocalPrompts();
    const item = list.find((p) => p.id === id);
    if (!item) return false;

    item.is_favorite = !item.is_favorite;
    item.updated_at = new Date().toISOString();
    saveLocalPrompts(list);
    return item.is_favorite;
  }

  async seedRemote(): Promise<void> {
    try {
      await fetch("/api/prompts/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompts: SEED_PROMPTS }),
      });
    } catch {
      // Ignored
    }
  }

  async exportAll(): Promise<PromptItem[]> {
    return getLocalPrompts();
  }

  async importData(importedPrompts: PromptItem[]): Promise<number> {
    const current = getLocalPrompts();
    const existingIds = new Set(current.map((p) => p.id));
    const merged = [...current];

    let count = 0;
    for (const p of importedPrompts) {
      if (!p.title || !p.content) continue;
      if (existingIds.has(p.id)) {
        // replace
        const idx = merged.findIndex((x) => x.id === p.id);
        merged[idx] = p;
      } else {
        merged.push(p);
      }
      count++;
    }

    saveLocalPrompts(merged);

    if (this.mode === "d1") {
      try {
        await fetch("/api/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompts: merged }),
        });
      } catch {
        // Local already updated
      }
    }

    return count;
  }
}

export const promptApi = new PromptApiClient();
