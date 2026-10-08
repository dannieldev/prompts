import React from "react";
import { Star, Copy, ArrowUpRight } from "lucide-react";
import { PromptItem } from "../types";
import { extractVariables } from "../lib/variableUtils";

interface PromptCardProps {
  prompt: PromptItem;
  onCopyDirect: (content: string, title: string) => void;
  onUseVariables: (prompt: PromptItem) => void;
  onViewDetail: (prompt: PromptItem) => void;
  onToggleFavorite: (id: string) => void;
  onSelectTag: (tag: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onCopyDirect, onUseVariables, onViewDetail, onToggleFavorite, onSelectTag }) => {
  const variables = extractVariables(prompt.content);
  return <article className="prompt-card" data-category={prompt.category}>
    <div className="prompt-card-top">
      <span className="category-label">{prompt.category}</span>
      <button className="icon-button favorite-button" aria-label={prompt.is_favorite ? `Quitar de favoritos: ${prompt.title}` : `Añadir a favoritos: ${prompt.title}`} aria-pressed={prompt.is_favorite} onClick={() => onToggleFavorite(prompt.id)}><Star size={19} fill={prompt.is_favorite ? "currentColor" : "none"} aria-hidden="true" /></button>
    </div>
    <h2><button onClick={() => onViewDetail(prompt)}>{prompt.title}</button></h2>
    <p className="prompt-description">{prompt.description}</p>
    <p className="prompt-models">{prompt.models?.join(" · ")}</p>
    <div className="prompt-tags">{prompt.tags?.slice(0, 3).map((tag) => <button key={tag} onClick={() => onSelectTag(tag)}>#{tag}</button>)}</div>
    <div className="prompt-card-bottom">
      <span>{variables.length ? `${variables.length} campos para adaptar` : "Editable al abrir"}</span>
      <button className="text-button" onClick={() => onViewDetail(prompt)}>Ver prompt<ArrowUpRight size={17} aria-hidden="true" /></button>
    </div>
    <div className="prompt-card-actions">
      <span className="text-xs text-muted">Base protegida</span>
      <div className="flex gap-2">
        <button className="quiet-button" onClick={() => onCopyDirect(prompt.content, prompt.title)}><Copy size={16} aria-hidden="true" />Copiar</button>
        {variables.length > 0 && <button className="secondary-button" onClick={() => onUseVariables(prompt)}>Adaptar</button>}
      </div>
    </div>
  </article>;
};
