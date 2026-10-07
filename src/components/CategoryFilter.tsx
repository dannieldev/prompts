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
            className={`rounded-2xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === "Todas"
                ? "shadow-md shadow-accent/20"
                : "border border-border/80 hover:border-border"
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
                className={`rounded-2xl text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? "shadow-md shadow-accent/20"
                    : "border border-border/80 hover:border-border"
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
            className="rounded-2xl text-xs font-medium transition-transform flex items-center gap-1.5"
            aria-label="Mostrar solo prompts célebres favoritos"
          >
            <Star
              className={`w-3.5 h-3.5 ${
                showFavoritesOnly ? "text-amber-300 fill-amber-300" : "text-amber-400"
              }`}
            />
            <span>Célebres</span>
            <Chip
              color={showFavoritesOnly ? "default" : "warning"}
              variant="soft"
              size="sm"
              className="text-[10px] font-bold px-1.5 py-0 min-h-0 h-4"
            >
              {favoritesCount}
            </Chip>
          </Button>

          {isAnyFilterActive && (
            <Button
              variant="danger-soft"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-2xl text-xs flex items-center gap-1"
              aria-label="Restablecer todos los filtros"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpiar filtros</span>
            </Button>
          )}
        </div>
      </div>

      {/* Sub-filters: AI Model & Active Tags */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-border/60 text-xs">
        {/* Model Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-muted flex items-center gap-1 font-medium whitespace-nowrap text-xs mr-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Modelo:</span>
          </span>

          <Button
            variant={selectedModel === "Todos" ? "primary" : "secondary"}
            size="sm"
            onClick={() => onSelectModel("Todos")}
            className={`rounded-xl text-[11px] h-7 px-2.5 transition whitespace-nowrap ${
              selectedModel === "Todos"
                ? "shadow-sm"
                : "border border-border/80 hover:border-border"
            }`}
          >
            Todos
          </Button>

          {AI_MODELS.map((model) => {
            const isSelected = selectedModel === model;
            return (
              <Button
                key={model}
                variant={isSelected ? "primary" : "secondary"}
                size="sm"
                onClick={() => onSelectModel(model)}
                className={`rounded-xl text-[11px] h-7 px-2.5 transition whitespace-nowrap ${
                  isSelected
                    ? "shadow-sm"
                    : "border border-border/80 hover:border-border"
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
            <TagIcon className="w-3 h-3 inline mr-1 text-accent" />
            <span>#{selectedTag}</span>
            <button
              onClick={onClearTag}
              className="ml-1.5 p-0.5 hover:text-foreground transition inline-flex items-center"
              title="Quitar filtro de tag"
            >
              <X className="w-3 h-3" />
            </button>
          </Chip>
        )}
      </div>

      {/* Top Popular Tags Quick Bar (when no tag selected) */}
      {!selectedTag && availableTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-muted pb-1 scrollbar-none no-scrollbar">
          <span className="text-muted flex items-center gap-1 shrink-0 text-xs mr-1">
            <TagIcon className="w-3 h-3 text-muted" />
            <span>Tags frecuentes:</span>
          </span>
          {availableTags.slice(0, 8).map((tag) => (
            <Chip
              key={tag}
              variant="secondary"
              size="sm"
              onClick={() => onSelectTag(tag)}
              className="cursor-pointer text-[10px] transition whitespace-nowrap hover:border-accent/40 active:scale-95"
            >
              #{tag}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
};
