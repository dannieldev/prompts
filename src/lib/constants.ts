import { AIModelTag, PromptCategory } from "../types";

export const CATEGORIES: PromptCategory[] = [
  "Desarrollo",
  "Marketing",
  "Automatización",
  "Redacción",
  "Sistemas",
  "Razonamiento",
  "General",
];

export const CATEGORY_ICONS: Record<PromptCategory, string> = {
  Desarrollo: "💻",
  Marketing: "📈",
  Automatización: "⚡",
  Redacción: "✍️",
  Sistemas: "☁️",
  Razonamiento: "🧠",
  General: "📌",
};

export const AI_MODELS: AIModelTag[] = [
  "Claude 3.5 Sonnet",
  "GPT-4o",
  "Codex",
  "Gemini 1.5 Pro",
  "DeepSeek / Ollama",
  "Cualquiera",
];
