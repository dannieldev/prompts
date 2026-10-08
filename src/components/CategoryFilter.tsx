import React from "react";
import { Star, X } from "lucide-react";
import { AIModelTag, PromptCategory } from "../types";
import { CATEGORIES, AI_MODELS } from "../lib/constants";

interface CategoryFilterProps {
  selectedCategory: PromptCategory | "Todas";
  onSelectCategory: (cat: PromptCategory | "Todas") => void;
  selectedModel: AIModelTag | "Todos";
  onSelectModel: (model: AIModelTag | "Todos") => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  selectedTag: string | null;
  onClearTag: () => void;
  favoritesCount: number;
  availableTags: string[];
  onSelectTag: (tag: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory, selectedModel, onSelectModel, showFavoritesOnly, onToggleFavorites, selectedTag, onClearTag, favoritesCount, availableTags, onSelectTag }) => {
  const isFiltered = selectedCategory !== "Todas" || selectedModel !== "Todos" || showFavoritesOnly || selectedTag !== null;
  return <div className="filters page-width" aria-label="Filtros de la biblioteca">
    <div className="filter-fields">
      <label>Categoría<select value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value as PromptCategory | "Todas")}><option value="Todas">Todas las categorías</option>{CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}</select></label>
      <label>Modelo<select value={selectedModel} onChange={(e) => onSelectModel(e.target.value as AIModelTag | "Todos")}><option value="Todos">Todos los modelos</option>{AI_MODELS.map((model) => <option key={model}>{model}</option>)}</select></label>
      <label>Etiqueta<select value={selectedTag || ""} onChange={(e) => e.target.value ? onSelectTag(e.target.value) : onClearTag()}><option value="">Todas las etiquetas</option>{availableTags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}</select></label>
    </div>
    <div className="filter-actions">
      <button className="quiet-button favorites-filter" aria-pressed={showFavoritesOnly} onClick={onToggleFavorites}><Star size={17} fill={showFavoritesOnly ? "currentColor" : "none"} aria-hidden="true" />Favoritos <span>{favoritesCount}</span></button>
      {isFiltered && <button className="quiet-button" onClick={() => { onSelectCategory("Todas"); onSelectModel("Todos"); if (showFavoritesOnly) onToggleFavorites(); onClearTag(); }}><X size={16} aria-hidden="true" />Limpiar filtros</button>}
    </div>
  </div>;
};
