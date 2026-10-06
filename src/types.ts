export type PromptCategory =
  | "Desarrollo"
  | "Marketing"
  | "Automatización"
  | "Redacción"
  | "Sistemas"
  | "Razonamiento"
  | "General";

export type AIModelTag =
  | "Claude 3.5 Sonnet"
  | "GPT-4o"
  | "Codex"
  | "Gemini 1.5 Pro"
  | "DeepSeek / Ollama"
  | "Cualquiera";

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  models: AIModelTag[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface PromptInput {
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  models: AIModelTag[];
  is_favorite?: boolean;
}

export interface ExtractedVariable {
  key: string;
  label: string;
  placeholder?: string;
}
