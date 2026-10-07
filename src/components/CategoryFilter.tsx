import React from "react";
import { Star, X, Tag as TagIcon, Sparkles } from "lucide-react";
import { Button, Chip } from "@heroui/react";
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
    <div className="flex flex-col gap-3 py-3.5 max-w-7xl mx-auto px-4 lg:px-8 w-full">
      {/* Primary Category Row + Favorites Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2.5">
        {/* Category Pills with HeroUI Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
          <Button
            variant={selectedCategory === "Todas" ? "primary" : "secondary"}
            size="sm"
            onClick={() => onSelectCategory("Todas")}
            className={`rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === "Todas"
                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.07]"
            }`}
          >
            <span>✨</span>
            <span>Todas</span>
          </Button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Button
                key={cat}
                variant={isSelected ? "primary" : "secondary"}
                size="sm"
                onClick={() => onSelectCategory(cat)}
                className={`rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                    : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.07]"
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                <span>{cat}</span>
              </Button>
            );
          })}
        </div>

        {/* Favorites and Reset Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={showFavoritesOnly ? "primary" : "outline"}
            size="sm"
            onClick={onToggleFavorites}
            className={`rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              showFavoritesOnly
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs"
                : "bg-white/[0.03] text-slate-300 hover:text-white border-white/[0.08]"
            }`}
            aria-label="Mostrar solo prompts célebres favoritos"
          >
            <Star
              className={`w-3.5 h-3.5 ${
                showFavoritesOnly ? "text-amber-400 fill-amber-400" : "text-slate-400"
              }`}
            />
            <span>Célebres</span>
            <Chip
              color="warning"
              variant="soft"
              size="sm"
              className="text-[10px] font-bold px-1.5 py-0"
            >
              {favoritesCount}
            </Chip>
          </Button>

          {isAnyFilterActive && (
            <Button
              variant="danger-soft"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-xl text-xs flex items-center gap-1 text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25"
              aria-label="Restablecer todos los filtros"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpiar filtros</span>
            </Button>
          )}
        </div>
      </div>

      {/* Sub-filters: AI Model & Active Tags */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/[0.06] text-xs">
        {/* Model Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-400 flex items-center gap-1 font-medium whitespace-nowrap text-xs mr-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Modelo:</span>
          </span>

          <Button
            variant={selectedModel === "Todos" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onSelectModel("Todos")}
            className={`rounded-lg text-[11px] h-7 px-2.5 transition whitespace-nowrap ${
              selectedModel === "Todos"
                ? "bg-white/[0.1] text-indigo-300 border border-indigo-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Todos
          </Button>

          {AI_MODELS.map((model) => {
            const isSelected = selectedModel === model;
            return (
              <Button
                key={model}
                variant={isSelected ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onSelectModel(model)}
                className={`rounded-lg text-[11px] h-7 px-2.5 transition whitespace-nowrap ${
                  isSelected
                    ? "bg-white/[0.1] text-indigo-300 border border-indigo-500/40 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {model}
              </Button>
            );
          })}
        </div>

        {/* Active Tag chip if selected */}
        {selectedTag && (
          <Chip
            color="accent"
            variant="soft"
            size="sm"
            className="flex items-center gap-1 text-[11px] font-medium"
          >
            <TagIcon className="w-3 h-3 inline mr-1 text-indigo-400" />
            <span>#{selectedTag}</span>
            <button
              onClick={onClearTag}
              className="ml-1.5 p-0.5 hover:text-white transition inline-flex items-center"
              title="Quitar filtro de tag"
            >
              <X className="w-3 h-3" />
            </button>
          </Chip>
        )}
      </div>

      {/* Top Popular Tags Quick Bar (when no tag selected) */}
      {!selectedTag && availableTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-500 pb-1 scrollbar-none no-scrollbar">
          <span className="text-slate-400 flex items-center gap-1 shrink-0 text-xs mr-1">
            <TagIcon className="w-3 h-3 text-slate-500" />
            <span>Tags frecuentes:</span>
          </span>
          {availableTags.slice(0, 8).map((tag) => (
            <Chip
              key={tag}
              variant="secondary"
              size="sm"
              onClick={() => onSelectTag(tag)}
              className="cursor-pointer text-[10px] text-slate-400 hover:text-indigo-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition whitespace-nowrap active:scale-95"
            >
              #{tag}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
};
