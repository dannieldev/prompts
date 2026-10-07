import React, { useState, useEffect } from "react";
import { X, Copy, Check, Zap, RotateCcw, Eye, Sparkles } from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";
import { PromptItem } from "../types";
import { extractVariables, replaceVariables } from "../lib/variableUtils";

interface VariableModalProps {
  prompt: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCopied: (text: string) => void;
}

export const VariableModal: React.FC<VariableModalProps> = ({
  prompt,
  isOpen,
  onClose,
  onCopied,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const variables = prompt ? extractVariables(prompt.content) : [];

  // Reset values when a new prompt is selected
  useEffect(() => {
    if (prompt) {
      const initial: Record<string, string> = {};
      const vars = extractVariables(prompt.content);
      vars.forEach((v) => {
        initial[v.key] = "";
      });
      setValues(initial);
      setCopied(false);
    }
  }, [prompt]);

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

  const handleInputChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    const initial: Record<string, string> = {};
    variables.forEach((v) => {
      initial[v.key] = "";
    });
    setValues(initial);
  };

  const generatedContent = replaceVariables(prompt.content, values);

  const handleCopy = (closeAfter: boolean = false) => {
    navigator.clipboard.writeText(generatedContent);
    onCopied(`¡Prompt "${prompt.title}" copiado con variables aplicadas!`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      if (closeAfter) onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-border flex items-center justify-between bg-surface-secondary/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground">Rellenar Variables Dinámicas</h2>
                <Chip
                  color="accent"
                  variant="soft"
                  size="sm"
                  className="font-mono text-[10px]"
                >
                  {variables.length} {variables.length === 1 ? "campo" : "campos"}
                </Chip>
              </div>
              <p className="text-xs text-muted line-clamp-1">{prompt.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showPreview ? "primary" : "outline"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="rounded-xl text-xs flex items-center gap-1.5"
              aria-label="Alternar vista previa en vivo"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vista Previa</span>
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="rounded-xl text-muted hover:text-foreground"
              aria-label="Restablecer campos"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl text-muted hover:text-foreground"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Body (Form + Live Preview) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Variables del Prompt
              </span>
              <span className="text-[11px] text-muted">
                Escribe los datos para insertarlos automáticamente
              </span>
            </div>

            {variables.map((v) => {
              const isLong =
                v.key.toLowerCase().includes("codigo") ||
                v.key.toLowerCase().includes("modulo") ||
                v.key.toLowerCase().includes("contexto") ||
                v.key.toLowerCase().includes("stack") ||
                v.key.toLowerCase().includes("esquema");

              return (
                <div
                  key={v.key}
                  className="bg-default/20 border border-border/80 rounded-2xl p-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25 transition-all shadow-inner"
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-foreground">
                      {v.label}
                    </label>
                    <Chip
                      color="accent"
                      variant="soft"
                      size="sm"
                      className="font-mono text-[10px] px-2 py-0.5"
                    >
                      {`{{${v.key}}}`}
                    </Chip>
                  </div>

                  {isLong ? (
                    <textarea
                      rows={3}
                      value={values[v.key] || ""}
                      onChange={(e) => handleInputChange(v.key, e.target.value)}
                      placeholder={`Escribe o pega el contenido para ${v.label.toLowerCase()}...`}
                      className="w-full bg-field text-foreground placeholder:text-muted text-xs rounded-xl p-3 border border-border focus:outline-none focus:border-focus font-mono-code transition"
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[v.key] || ""}
                      onChange={(e) => handleInputChange(v.key, e.target.value)}
                      placeholder={`Ej: ${v.label}...`}
                      className="w-full bg-field text-foreground placeholder:text-muted text-xs rounded-xl px-3 py-2.5 border border-border focus:outline-none focus:border-focus transition"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Preview column */}
          {showPreview && (
            <div className="flex flex-col gap-2.5 h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Resultado en Tiempo Real
                </span>
                <Chip
                  color="accent"
                  variant="soft"
                  size="sm"
                  className="font-semibold text-[11px]"
                >
                  {Object.values(values).filter(Boolean).length}/{variables.length} completadas
                </Chip>
              </div>

              <div className="flex-1 bg-default/30 border border-border rounded-2xl p-5 font-mono-code text-xs text-foreground leading-relaxed overflow-y-auto max-h-[460px] whitespace-pre-wrap select-text shadow-inner">
                {generatedContent}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-secondary/40 border-t border-border flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-muted">
            Listo para usar en <strong className="text-foreground">ChatGPT</strong>,{" "}
            <strong className="text-foreground">Claude</strong> o <strong className="text-foreground">Codex</strong>.
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-xl text-xs text-muted hover:text-foreground"
            >
              Cancelar <Kbd className="ml-1 text-[9px]">Esc</Kbd>
            </Button>

            <Button
              variant={copied ? "primary" : "secondary"}
              size="sm"
              onClick={() => handleCopy(false)}
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
                  <span>Copiar</span>
                </>
              )}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleCopy(true)}
              className="rounded-xl text-xs font-semibold shadow-xs"
            >
              <Zap className="w-4 h-4 mr-1" />
              <span>Copiar y Cerrar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
