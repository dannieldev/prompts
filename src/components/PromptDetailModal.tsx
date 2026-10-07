import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  Zap,
  Edit2,
  Star,
  Bot,
  Calendar,
  Tag as TagIcon,
  Sparkles,
  Sliders,
} from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";
import { PromptItem } from "../types";
import { CATEGORY_ICONS } from "../lib/constants";
import { extractVariables } from "../lib/variableUtils";

interface PromptDetailModalProps {
  prompt: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (prompt: PromptItem) => void;
  onUseVariables: (prompt: PromptItem) => void;
  onToggleFavorite: (id: string) => void;
  onCopied: (text: string) => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  prompt,
  isOpen,
  onClose,
  onEdit,
  onUseVariables,
  onToggleFavorite,
  onCopied,
}) => {
  const [copied, setCopied] = useState(false);

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

  const handleCopyDirect = () => {
    navigator.clipboard.writeText(prompt.content);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
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
                <Chip
                  color="accent"
                  variant="soft"
                  size="sm"
                  className="font-semibold text-[11px]"
                >
                  <span className="mr-1">{CATEGORY_ICONS[prompt.category]}</span>
                  <span>{prompt.category}</span>
                </Chip>
                <span className="text-xs text-muted flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-muted" />
                  <span>{formatDate(prompt.updated_at || prompt.created_at)}</span>
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground mt-1 leading-tight">{prompt.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(prompt);
              }}
              className="text-muted hover:text-foreground rounded-xl text-xs"
              aria-label="Editar prompt"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Editar</span>
            </Button>

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
            <div className="bg-default/20 border border-border/70 rounded-2xl p-4 text-xs text-foreground/90 leading-relaxed font-normal shadow-inner">
              <strong className="text-muted block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                Propósito & Caso de Uso:
              </strong>
              {prompt.description}
            </div>
          )}

          {/* AI Models & Tags Row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            {prompt.models && prompt.models.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-muted flex items-center gap-1 mr-1">
                  <Bot className="w-3.5 h-3.5 text-accent" />
                  <span>Modelos recomendados:</span>
                </span>
                {prompt.models.map((m) => (
                  <Chip
                    key={m}
                    variant="secondary"
                    size="sm"
                    className="text-[11px]"
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
                    className="text-[10px]"
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
                  <h4 className="text-xs font-bold text-foreground">Variables Dinámicas Detectadas</h4>
                  <p className="text-[11px] text-muted">
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
                className="rounded-xl text-xs font-semibold shrink-0"
              >
                <Sliders className="w-3.5 h-3.5 mr-1" />
                <span>Rellenar Ahora</span>
              </Button>
            </div>
          )}

          {/* Prompt Full Text */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Contenido Completo del Prompt
              </span>
              <span className="text-[11px] font-mono text-muted">
                {prompt.content.length} caracteres
              </span>
            </div>

            <div className="bg-default/30 border border-border rounded-2xl p-5 font-mono-code text-xs text-foreground leading-relaxed overflow-y-auto max-h-[420px] whitespace-pre-wrap select-text shadow-inner">
              {prompt.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-secondary/40 border-t border-border flex items-center justify-between flex-wrap gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs font-medium text-muted hover:text-foreground rounded-xl"
          >
            Cerrar <Kbd className="ml-1 text-[9px]">Esc</Kbd>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant={copied ? "primary" : "secondary"}
              size="sm"
              onClick={handleCopyDirect}
              className="rounded-xl text-xs font-medium transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  <span>Copiar Texto Crudo</span>
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
                className="rounded-xl text-xs font-semibold shadow-xs"
              >
                <Sliders className="w-4 h-4 mr-1" />
                <span>Rellenar Variables</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
