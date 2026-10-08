import { useDialogFocus } from "../hooks/useDialogFocus";
import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  Zap,
  RotateCcw,
  Star,
  Bot,
  Calendar,
  Tag as TagIcon,
  Sparkles,
  Sliders,
} from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";
import { PromptItem } from "../types";
import { extractVariables } from "../lib/variableUtils";

interface PromptDetailModalProps {
  prompt: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUseVariables: (prompt: PromptItem) => void;
  onToggleFavorite: (id: string) => void;
  onCopied: (text: string) => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  prompt,
  isOpen,
  onClose,
  onUseVariables,
  onToggleFavorite,
  onCopied,
}) => {
  const dialogRef = useDialogFocus(isOpen);
  const [copied, setCopied] = useState(false);
  const [draftContent, setDraftContent] = useState("");

  useEffect(() => {
    if (prompt && isOpen) {
      setDraftContent(prompt.content);
      setCopied(false);
    }
  }, [prompt, isOpen]);

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

  if (!isOpen || !prompt) return null;

  const variables = extractVariables(prompt.content);
  const hasVariables = variables.length > 0;
  const isModified = draftContent !== prompt.content;

  const handleCopyDirect = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    onCopied(`¡Prompt "${prompt.title}" copiado al portapapeles!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (isoStr: string) => {
    try {
      return new Date(isoStr).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/30">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Leer prompt" tabIndex={-1} className="app-dialog relative w-full max-w-4xl max-h-[92vh] bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-border flex items-center justify-between bg-surface-secondary/50">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              size="sm"
              variant={prompt.is_favorite ? "secondary" : "ghost"}
              onClick={() => onToggleFavorite(prompt.id)}
              className="rounded-xl transition-transform active:scale-90"
              aria-label={prompt.is_favorite ? "Quitar de célebres" : "Marcar como célebre"}
            >
              <Star className={`w-4 h-4 ${prompt.is_favorite ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
            </Button>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="category-label" data-category={prompt.category}>{prompt.category}</span>
                <span className="text-sm text-muted flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-muted" />
                  <span>{formatDate(prompt.updated_at || prompt.created_at)}</span>
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground mt-1 leading-tight">{prompt.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isModified && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDraftContent(prompt.content)}
                className="text-muted hover:text-foreground rounded-xl text-sm"
                aria-label="Restaurar contenido base"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">Volver a la base</span>
              </Button>
            )}

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-muted hover:text-foreground rounded-xl"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {/* Description */}
          {prompt.description && (
            <div className="bg-default/20 border border-border/70 rounded-2xl p-4 text-sm text-foreground/90 leading-relaxed font-normal ">
              <strong className="text-muted block mb-1 text-sm uppercase tracking-wider font-semibold">
                Propósito & Caso de Uso:
              </strong>
              {prompt.description}
            </div>
          )}

          {/* AI Models & Tags Row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            {prompt.models && prompt.models.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm text-muted flex items-center gap-1 mr-1">
                  <Bot className="w-3.5 h-3.5 text-accent" />
                  <span>Modelos recomendados:</span>
                </span>
                {prompt.models.map((m) => (
                  <Chip
                    key={m}
                    variant="secondary"
                    size="sm"
                    className="text-sm"
                  >
                    {m}
                  </Chip>
                ))}
              </div>
            )}

            {prompt.tags && prompt.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <TagIcon className="w-3 h-3 text-muted" />
                {prompt.tags.map((t) => (
                  <Chip
                    key={t}
                    color="accent"
                    variant="soft"
                    size="sm"
                    className="text-xs"
                  >
                    #{t}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Variables Alert */}
          {hasVariables && (
            <div className="bg-accent-soft border border-accent/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Variables Dinámicas Detectadas</h4>
                  <p className="text-sm text-muted">
                    Este prompt tiene {variables.length} campos personalizables:{" "}
                    <span className="text-accent font-mono">
                      {variables.map((v) => `{{${v.key}}}`).join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onUseVariables(prompt);
                }}
                className="rounded-xl text-sm font-semibold shrink-0"
              >
                <Sliders className="w-3.5 h-3.5 mr-1" />
                <span>Adaptar prompt</span>
              </Button>
            </div>
          )}

          {/* Ephemeral editing notice */}
          <div className="bg-surface-secondary/70 border border-border rounded-2xl px-4 py-3 text-sm text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2" role="note">
            <span>
              <strong className="text-foreground">Edición en el momento (no se guardan cambios):</strong>{" "}
              Puedes adaptar este texto directamente aquí antes de copiarlo. Al cerrar esta ventana, el prompt vuelve a su estado base original.
            </span>
          </div>

          {/* Prompt Full Text (Editable in the moment) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <label htmlFor="prompt-detail-editor" className="text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Base del Prompt (Editable al momento)
              </label>
              <span className="text-sm font-mono text-muted">
                {draftContent.length} caracteres {isModified ? "· editado temporalmente" : "· base intacta"}
              </span>
            </div>

            <textarea
              id="prompt-detail-editor"
              rows={12}
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="w-full bg-default/30 border border-border focus:border-accent focus:outline-none rounded-2xl p-5 font-mono-code text-base text-foreground leading-relaxed overflow-y-auto min-h-[260px] max-h-[420px] resize-y"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-secondary/40 border-t border-border flex items-center justify-between flex-wrap gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-sm font-medium text-muted hover:text-foreground rounded-xl"
          >
            Cerrar <Kbd className="ml-1 text-xs">Esc</Kbd>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant={copied ? "primary" : "secondary"}
              size="sm"
              onClick={handleCopyDirect}
              className="rounded-xl text-sm font-medium transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  <span>Copiar texto</span>
                </>
              )}
            </Button>

            {hasVariables && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onUseVariables(prompt);
                }}
                className="rounded-xl text-sm font-semibold shadow-xs"
              >
                <Sliders className="w-4 h-4 mr-1" />
                <span>Adaptar prompt</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
