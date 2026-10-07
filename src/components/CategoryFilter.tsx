import React from "react";
import { Star, X, Tag as TagIcon, Sparkles } from "lucide-react";
import { AIModelTag, PromptCategory } from "../types";
import { CATEGORIES, CATEGORY_ICONS, AI_MODELS } from "../lib/constants";

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

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedModel,
  onSelectModel,
  showFavoritesOnly,
  onToggleFavorites,
  selectedTag,
  onClearTag,
  favoritesCount,
  availableTags,
  onSelectTag,
}) => {
  const isAnyFilterActive =
    selectedCategory !== "Todas" ||
    selectedModel !== "Todos" ||
    showFavoritesOnly ||
    selectedTag !== null;

  const handleResetFilters = () => {
    onSelectCategory("Todas");
    onSelectModel("Todos");
    if (showFavoritesOnly) onToggleFavorites();
    onClearTag();
  };

  return (
    <div className="flex flex-col gap-3 py-3.5 max-w-7xl mx-auto px-4 lg:px-8">
      {/* Primary Category Row + Favorites Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2.5">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
          <button
            onClick={() => onSelectCategory("Todas")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
              selectedCategory === "Todas"
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold border border-indigo-400/40"
                : "bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-white/[0.07]"
            }`}
          >
            <span>✨</span>
            <span>Todas</span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold border border-indigo-400/40"
                    : "bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border border-white/[0.07]"
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Favorites and Reset Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onToggleFavorites}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border active:scale-95 ${
              showFavoritesOnly
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold shadow-xs"
                : "bg-white/[0.03] border-white/[0.07] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
            }`}
            title="Mostrar solo prompts célebres favoritos"
          >
            <Star
              className={`w-3.5 h-3.5 ${
                showFavoritesOnly ? "text-amber-400 fill-amber-400" : "text-slate-400"
              }`}
            />
            <span>Célebres</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
              {favoritesCount}
            </span>
          </button>

          {isAnyFilterActive && (
            <button
              onClick={handleResetFilters}
              className="px-2.5 py-1.5 rounded-xl text-xs text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all active:scale-95 flex items-center gap-1"
              title="Restablecer todos los filtros"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-filters: AI Model & Active Tags */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#1a2333]/60 text-xs">
        {/* Model Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-gray-500 flex items-center gap-1 font-medium whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Modelo:</span>
          </span>

          <button
            onClick={() => onSelectModel("Todos")}
            className={`px-2 py-0.8 rounded-lg text-[11px] transition whitespace-nowrap ${
              selectedModel === "Todos"
                ? "bg-gray-800 text-indigo-300 border border-indigo-500/40 font-medium"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Todos
          </button>

          {AI_MODELS.map((model) => {
            const isSelected = selectedModel === model;
            return (
              <button
                key={model}
                onClick={() => onSelectModel(model)}
                className={`px-2 py-0.8 rounded-lg text-[11px] transition whitespace-nowrap ${
                  isSelected
                    ? "bg-gray-800 text-indigo-300 border border-indigo-500/40 font-medium"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {model}
              </button>
            );
          })}
        </div>

        {/* Active Tag pill if selected */}
        {selectedTag && (
          <div className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.8 rounded-lg text-[11px] text-indigo-300">
            <TagIcon className="w-3 h-3" />
            <span>Tag: <strong>#{selectedTag}</strong></span>
            <button
              onClick={onClearTag}
              className="p-0.5 hover:text-white transition ml-1"
              title="Quitar filtro de tag"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Top 6 Popular Tags Quick Bar (if not tag selected) */}
      {!selectedTag && availableTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-gray-500 pb-1">
          <span className="text-gray-500 flex items-center gap-1 shrink-0">
            <TagIcon className="w-3 h-3" />
            <span>Tags populares:</span>
          </span>
          {availableTags.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="px-2 py-0.5 rounded-md bg-[#111827] hover:bg-[#1a2333] text-gray-400 hover:text-indigo-300 border border-[#1f293d] transition whitespace-nowrap"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
