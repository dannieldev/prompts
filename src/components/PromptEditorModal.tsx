import { useDialogFocus } from "../hooks/useDialogFocus";
import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Star,
  Plus,
  Tag as TagIcon,
  Bot,
  Zap,
  Eye,
  Code2,
  HelpCircle,
} from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";
import { AIModelTag, PromptCategory, PromptInput, PromptItem } from "../types";
import { CATEGORIES, CATEGORY_ICONS, AI_MODELS } from "../lib/constants";
import { extractVariables } from "../lib/variableUtils";

interface PromptEditorModalProps {
  isOpen: boolean;
  initialPrompt?: PromptItem | null;
  onClose: () => void;
  onSave: (data: PromptInput, existingId?: string) => Promise<void>;
}

export const PromptEditorModal: React.FC<PromptEditorModalProps> = ({
  isOpen,
  initialPrompt,
  onClose,
  onSave,
}) => {
  const dialogRef = useDialogFocus(isOpen);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PromptCategory>("Desarrollo");
  const [selectedModels, setSelectedModels] = useState<AIModelTag[]>(["Claude 3.5 Sonnet", "GPT-4o"]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      setTitle(initialPrompt.title);
      setDescription(initialPrompt.description);
      setContent(initialPrompt.content);
      setCategory(initialPrompt.category);
      setSelectedModels(initialPrompt.models || []);
      setTags(initialPrompt.tags || []);
      setIsFavorite(initialPrompt.is_favorite);
    } else {
      setTitle("");
      setDescription("");
      setContent("");
      setCategory("Desarrollo");
      setSelectedModels(["Claude 3.5 Sonnet", "GPT-4o"]);
      setTags([]);
      setIsFavorite(false);
    }
    setTagInput("");
    setActiveTab("edit");
    setError(null);
  }, [initialPrompt, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const detectedVars = extractVariables(content);

  const handleAddTag = () => {
    const trimmed = tagInput.trim().toLowerCase().replace(/^#/, "");
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const toggleModel = (model: AIModelTag) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter((m) => m !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const insertVariablePlaceholder = (varName: string = "variable") => {
    const placeholder = `{{${varName}}}`;
    setContent((prev) => prev + placeholder);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Por favor ingresa un título para el prompt.");
      return;
    }
    if (!content.trim()) {
      setError("El contenido del prompt no puede estar vacío.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await onSave(
        {
          title: title.trim(),
          description: description.trim(),
          content: content.trim(),
          category,
          tags,
          models: selectedModels,
          is_favorite: isFavorite,
        },
        initialPrompt ? initialPrompt.id : undefined
      );
      onClose();
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al guardar el prompt.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/30">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Editar prompt" tabIndex={-1} className="app-dialog relative w-full max-w-4xl max-h-[92vh] bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-border flex items-center justify-between bg-surface-secondary/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-white font-bold shadow-lg shadow-accent/25">
              {initialPrompt ? "✏️" : "✨"}
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {initialPrompt ? "Editar Prompt Célebre" : "Nuevo Prompt Célebre"}
              </h2>
              <p className="text-sm text-muted">
                Configura variables dinámicas con <code className="text-accent font-mono">{"{{variable}}"}</code>
              </p>
            </div>
          </div>

          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="rounded-xl text-muted hover:text-foreground"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {error && (
            <div className="p-3.5 bg-danger/10 border border-rose-500/40 rounded-2xl text-danger text-sm font-medium">
              {error}
            </div>
          )}

          {/* Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-bold text-foreground/80">
                Título del Prompt <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Arquitecto de Software & Refactorización Limpia"
                className="w-full bg-field text-foreground placeholder:text-muted text-sm rounded-2xl px-4 py-2.5 border border-border focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-foreground/80">
                Categoría <span className="text-rose-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PromptCategory)}
                className="w-full bg-field text-foreground text-sm rounded-2xl px-4 py-2.5 border border-border focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition cursor-pointer "
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_ICONS[cat]} {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground/80">
              Descripción Corta (Propósito o caso de uso)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Diseñado para auditar arquitectura de software y proponer refactors paso a paso"
              className="w-full bg-field text-foreground placeholder:text-muted text-sm rounded-2xl px-4 py-2.5 border border-border focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition "
            />
          </div>

          {/* AI Models Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-foreground/80 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-accent" />
              Modelos de IA Recomendados
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {AI_MODELS.map((m) => {
                const isSelected = selectedModels.includes(m);
                return (
                  <Chip
                    key={m}
                    color={isSelected ? "accent" : "default"}
                    variant={isSelected ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => toggleModel(m)}
                    className="cursor-pointer text-sm font-medium transition-all active:scale-95"
                  >
                    {m}
                  </Chip>
                );
              })}
            </div>
          </div>

          {/* Content with Tabs: Edit / Preview */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-foreground/80">
                  Instrucciones del Prompt <span className="text-rose-400">*</span>
                </label>
                {detectedVars.length > 0 && (
                  <Chip
                    color="accent"
                    variant="soft"
                    size="sm"
                    className="font-mono text-xs"
                  >
                    <Zap className="w-3 h-3 inline mr-1 text-accent" />
                    {detectedVars.length} variables detectadas
                  </Chip>
                )}
              </div>

              {/* Tab selector and placeholder insert button */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertVariablePlaceholder()}
                  className="rounded-xl text-sm text-accent hover:text-foreground border-accent/30"
                  aria-label="Insertar variable"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Insertar {"{{variable}}"}</span>
                </Button>

                <div className="flex items-center bg-surface-secondary rounded-xl p-1 border border-border">
                  <Button
                    type="button"
                    variant={activeTab === "edit" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("edit")}
                    className="rounded-lg text-sm"
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" />
                    <span>Editor</span>
                  </Button>
                  <Button
                    type="button"
                    variant={activeTab === "preview" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("preview")}
                    className="rounded-lg text-sm"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    <span>Vista Previa</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Helper info bar */}
            <div className="flex items-center gap-1.5 text-sm text-muted bg-surface-secondary/70 px-3.5 py-2 rounded-xl border border-border/60">
              <HelpCircle className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>
                Tip: Escribe placeholders como <code className="text-accent font-mono">{"{{codigo}}"}</code> o{" "}
                <code className="text-accent font-mono">{"{{lenguaje}}"}</code> para habilitar el formulario interactivo.
              </span>
            </div>

            {/* Textarea or Preview */}
            {activeTab === "edit" ? (
              <textarea
                required
                rows={11}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Actúa como un Senior Staff Engineer...

Contexto: {{contexto}}
Código:
```{{lenguaje}}
{{codigo}}
```"
                className="w-full bg-field text-foreground placeholder:text-muted text-sm rounded-2xl p-4 border border-border focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 font-mono-code leading-relaxed transition resize-y "
              />
            ) : (
              <div className="w-full bg-field border border-border rounded-2xl p-5 font-mono-code text-base text-foreground/90 leading-relaxed overflow-y-auto max-h-[300px] whitespace-pre-wrap ">
                {content || <span className="text-muted italic">No hay contenido aún...</span>}
              </div>
            )}
          </div>

          {/* Tags and Favorites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Tags input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-foreground/80 flex items-center gap-1.5">
                <TagIcon className="w-3.5 h-3.5 text-accent" />
                Etiquetas (Tags)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Escribe un tag y presiona Enter..."
                  className="flex-1 bg-field text-foreground placeholder:text-muted text-sm rounded-xl px-3.5 py-2.5 border border-border focus:outline-none focus:border-accent transition "
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddTag}
                  className="rounded-xl text-sm"
                >
                  Agregar
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      color="accent"
                      variant="soft"
                      size="sm"
                      className="text-sm"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-rose-400 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Chip>
                  ))}
                </div>
              )}
            </div>

            {/* Favorite toggle checkbox */}
            <div className="flex items-center gap-3 bg-surface-secondary/70 border border-border rounded-2xl p-4 self-start ">
              <input
                id="is-fav"
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer accent-amber-500"
              />
              <label htmlFor="is-fav" className="text-sm text-foreground cursor-pointer flex items-center gap-1.5 font-medium">
                <Star className={`w-4 h-4 ${isFavorite ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                <span>Marcar como <strong>Célebre / Favorito ⭐</strong> (Fijar arriba)</span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-secondary/50 border-t border-border flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-xl text-sm text-muted hover:text-foreground"
          >
            Cancelar <Kbd className="ml-1 text-xs">Esc</Kbd>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isDisabled={saving}
            className="rounded-xl text-sm font-semibold shadow-lg shadow-accent/25"
          >
            <Save className="w-4 h-4 mr-1" />
            <span>{saving ? "Guardando..." : initialPrompt ? "Actualizar Prompt" : "Guardar Prompt"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
