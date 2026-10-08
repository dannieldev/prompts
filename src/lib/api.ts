import { PromptInput, PromptItem } from "../types";
import { SEED_PROMPTS } from "./seedData";

// A separate namespace leaves the old personal collection intact, without importing it into the public edition.
const STORAGE_KEY = "prompts_celebres_public_v1";
const SEED_IDS = new Set(SEED_PROMPTS.map((p) => p.id));

function getLocalPrompts(): PromptItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== null) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const favById = new Map<string, boolean>();
        const customPrompts: PromptItem[] = [];

        for (const item of parsed) {
          if (!item || typeof item !== "object") continue;
          if (SEED_IDS.has(item.id)) {
            if (typeof item.is_favorite === "boolean") {
              favById.set(item.id, item.is_favorite);
            }
          } else if (item.id && item.title && item.content) {
            customPrompts.push(item);
          }
        }

        const intactSeeds = structuredClone(SEED_PROMPTS).map((seed) => ({
          ...seed,
          is_favorite: favById.has(seed.id) ? favById.get(seed.id)! : seed.is_favorite,
        }));

        const combined = [...customPrompts, ...intactSeeds];
        saveLocalPrompts(combined);
        return combined;
      }
    } catch {
      // Recuperar catálogo base automáticamente si el almacenamiento local está corrupto
    }
  }
  const prompts = structuredClone(SEED_PROMPTS);
  saveLocalPrompts(prompts);
  return prompts;
}

function saveLocalPrompts(prompts: PromptItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

class PromptApiClient {
  async getAllPrompts(): Promise<PromptItem[]> {
    return getLocalPrompts();
  }

  async createPrompt(input: PromptInput): Promise<PromptItem> {
    const now = new Date().toISOString();
    const prompt: PromptItem = {
      ...input,
      id: `prompt_${crypto.randomUUID()}`,
      title: input.title.trim(),
      description: input.description.trim(),
      is_favorite: Boolean(input.is_favorite),
      created_at: now,
      updated_at: now,
    };
    saveLocalPrompts([prompt, ...getLocalPrompts()]);
    return prompt;
  }

  async toggleFavorite(id: string): Promise<boolean> {
    const prompts = getLocalPrompts();
    const index = prompts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Prompt no encontrado");
    const nextFavorite = !prompts[index].is_favorite;
    prompts[index] = {
      ...prompts[index],
      is_favorite: nextFavorite,
    };
    saveLocalPrompts(prompts);
    return nextFavorite;
  }

  async importData(importedPrompts: PromptItem[]): Promise<number> {
    const current = getLocalPrompts();
    const customMap = new Map(
      current.filter((p) => !SEED_IDS.has(p.id)).map((p) => [p.id, p])
    );
    const seedFavMap = new Map(
      current.filter((p) => SEED_IDS.has(p.id)).map((p) => [p.id, p.is_favorite])
    );

    let count = 0;
    for (const prompt of importedPrompts) {
      if (!prompt.title || !prompt.content) continue;
      const id = prompt.id || `prompt_${crypto.randomUUID()}`;
      if (SEED_IDS.has(id)) {
        if (typeof prompt.is_favorite === "boolean") {
          seedFavMap.set(id, prompt.is_favorite);
        }
        continue;
      }
      customMap.set(id, { ...prompt, id });
      count++;
    }

    const intactSeeds = structuredClone(SEED_PROMPTS).map((seed) => ({
      ...seed,
      is_favorite: seedFavMap.has(seed.id) ? seedFavMap.get(seed.id)! : seed.is_favorite,
    }));

    saveLocalPrompts([...customMap.values(), ...intactSeeds]);
    return count;
  }
}

export const promptApi = new PromptApiClient();
