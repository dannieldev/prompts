import { ExtractedVariable } from "../types";

/**
 * Extracts unique placeholders enclosed in {{variable}} or {variable}
 */
export function extractVariables(content: string): ExtractedVariable[] {
  if (!content) return [];

  // Match {{variable_name}} or {variable_name}
  // We prioritize {{...}} and support {...} as well
  const regex = /\{\{([a-zA-Z0-9_\-áéíóúÁÉÍÓÚñÑ ]+)\}\}|\{([a-zA-Z0-9_\-áéíóúÁÉÍÓÚñÑ ]+)\}/g;
  const matches = new Set<string>();
  let match;

  while ((match = regex.exec(content)) !== null) {
    const rawVar = (match[1] || match[2] || "").trim();
    // Exclude markdown tables or JSON objects if any
    if (rawVar && !rawVar.includes(":") && !rawVar.includes(";")) {
      matches.add(rawVar);
    }
  }

  return Array.from(matches).map((key) => ({
    key,
    label: formatVariableLabel(key),
  }));
}

/**
 * Transforms variable key into readable label:
 * e.g. "lenguaje_y_stack" -> "Lenguaje y Stack"
 */
export function formatVariableLabel(key: string): string {
  return key
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Replaces placeholders in content with user-supplied values
 */
export function replaceVariables(
  content: string,
  values: Record<string, string>
): string {
  let result = content;

  for (const [key, val] of Object.entries(values)) {
    if (!val) continue;
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const bracketRegex = new RegExp(`\\{\\{${escapedKey}\\}\\}|\\{${escapedKey}\\}`, "g");
    result = result.replace(bracketRegex, () => val);
  }

  return result;
}
