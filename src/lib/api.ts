import { PromptInput, PromptItem } from "../types";
import { SEED_PROMPTS } from "./seedData";

// A separate namespace leaves the old personal collection intact, without importing it into the public edition.
const STORAGE_KEY = "prompts_celebres_public_v1";

function getLocalPrompts(): PromptItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== null) {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("El respaldo local no tiene un formato válido.");
    return parsed;
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

  async updatePrompt(id: string, input: Partial<PromptInput>): Promise<PromptItem> {
    const prompts = getLocalPrompts();
    const index = prompts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Prompt no encontrado");
    const updated: PromptItem = {
      ...prompts[index],
      ...input,
      title: input.title?.trim() ?? prompts[index].title,
      description: input.description?.trim() ?? prompts[index].description,
      updated_at: new Date().toISOString(),
    };
    prompts[index] = updated;
    saveLocalPrompts(prompts);
    return updated;
  }

  async deletePrompt(id: string): Promise<void> {
    saveLocalPrompts(getLocalPrompts().filter((p) => p.id !== id));
  }

  async toggleFavorite(id: string): Promise<boolean> {
    const prompt = getLocalPrompts().find((p) => p.id === id);
    if (!prompt) throw new Error("Prompt no encontrado");
    const updated = await this.updatePrompt(id, { is_favorite: !prompt.is_favorite });
    return updated.is_favorite;
  }

  async importData(importedPrompts: PromptItem[]): Promise<number> {
    const merged = new Map(getLocalPrompts().map((p) => [p.id, p]));
    let count = 0;
    for (const prompt of importedPrompts) {
      if (!prompt.title || !prompt.content) continue;
      const id = prompt.id || `prompt_${crypto.randomUUID()}`;
      merged.set(id, { ...prompt, id });
      count++;
    }
    saveLocalPrompts([...merged.values()]);
    return count;
  }
}

export const promptApi = new PromptApiClient();
