import { useDialogFocus } from "../hooks/useDialogFocus";
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
  const dialogRef = useDialogFocus(isOpen);
  const [values, setValues] = useState<Record<string, string>>({});
  const [templateDraft, setTemplateDraft] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const variables = prompt ? extractVariables(prompt.content) : [];

  // Reset values when modal opens or a new prompt is selected
  useEffect(() => {
    if (prompt && isOpen) {
      const initial: Record<string, string> = {};
      const vars = extractVariables(prompt.content);
      vars.forEach((v) => {
        initial[v.key] = "";
      });
      setValues(initial);
      setTemplateDraft(prompt.content);
      setCopied(false);
    }
  }, [prompt?.id, prompt?.content, isOpen]);

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
    const prevVal = values[key] || "";
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const hasPlaceholder = new RegExp(`\\{\\{${escapedKey}\\}\\}|\\{${escapedKey}\\}`).test(
      templateDraft
    );

    if (!hasPlaceholder && prevVal && templateDraft.includes(prevVal)) {
      setTemplateDraft((prev) => prev.split(prevVal).join(`{{${key}}}`));
    }

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
    setTemplateDraft(prompt.content);
  };

  const finalContent = replaceVariables(templateDraft || prompt.content, values);

  const handleCopy = (closeAfter: boolean = false) => {
    navigator.clipboard.writeText(finalContent);
    onCopied(`¡Prompt "${prompt.title}" copiado con variables aplicadas!`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      if (closeAfter) onClose();
    }, 1200);
  };

  return (
    <div className="dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/30">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Adaptar prompt" tabIndex={-1} className="app-dialog relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border flex items-center justify-between gap-3 bg-surface-secondary/50">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Zap className="w-5 h-5 shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-bold text-foreground truncate">Adaptar prompt</h2>
                <Chip
                  color="accent"
                  variant="soft"
                  size="sm"
                  className="font-mono text-xs shrink-0"
                >
                  {variables.length} {variables.length === 1 ? "campo" : "campos"}
                </Chip>
              </div>
              <p className="text-xs sm:text-sm text-muted truncate">{prompt.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button
              variant={showPreview ? "primary" : "outline"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="rounded-xl text-xs sm:text-sm flex items-center gap-1.5 min-h-[44px] px-2.5 sm:px-3"
              aria-label="Alternar vista previa en vivo"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Vista Previa</span>
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="rounded-xl text-muted hover:text-foreground w-11 h-11 min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center p-0"
              aria-label="Restablecer campos"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl text-muted hover:text-foreground w-11 h-11 min-w-[44px] min-h-[44px] shrink-0 flex items-center justify-center p-0"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4 shrink-0" />
            </Button>
          </div>
        </div>

        {/* Ephemeral editing notice */}
        <div className="px-4 py-2 sm:px-6 sm:py-2.5 bg-surface-secondary/70 border-b border-border text-xs sm:text-sm text-muted shrink-0" role="note">
          <strong className="text-foreground">Edición en el momento (no se guardan cambios):</strong>{" "}
          Completa las variables o edita el texto directamente para copiarlo. Al salir de esta ventana, el prompt vuelve a su estado base original.
        </div>

        {/* Body (Form + Live Preview) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Form column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-1.5 pb-1">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                Variables del Prompt
              </span>
              <span className="text-xs sm:text-sm text-muted">
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
                  className="bg-default/20 border border-border/80 rounded-2xl p-3.5 sm:p-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25 transition-all"
                >
                  <div className="flex items-center justify-between flex-wrap gap-1.5 mb-2">
                    <label htmlFor={`variable-${v.key}`} className="text-sm font-bold text-foreground">
                      {v.label}
                    </label>
                    <Chip
                      color="accent"
                      variant="soft"
                      size="sm"
                      className="font-mono text-xs px-2 py-0.5 shrink-0 max-w-full"
                    >
                      {`{{${v.key}}}`}
                    </Chip>
                  </div>

                  {isLong ? (
                    <textarea
                      id={`variable-${v.key}`}
                      rows={3}
                      value={values[v.key] || ""}
                      onChange={(e) => handleInputChange(v.key, e.target.value)}
                      placeholder={`Escribe o pega el contenido para ${v.label.toLowerCase()}...`}
                      className="w-full bg-field text-foreground placeholder:text-muted text-base sm:text-sm rounded-xl p-3 border border-border focus:outline-none focus:border-focus font-mono-code transition"
                    />
                  ) : (
                    <input
                      id={`variable-${v.key}`}
                      type="text"
                      value={values[v.key] || ""}
                      onChange={(e) => handleInputChange(v.key, e.target.value)}
                      placeholder={`Ej: ${v.label}...`}
                      className="w-full bg-field text-foreground placeholder:text-muted text-base sm:text-sm rounded-xl px-3 py-2.5 border border-border focus:outline-none focus:border-focus transition"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Preview column */}
          {showPreview && (
            <div className="flex flex-col gap-2.5 h-full">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <label htmlFor="variable-live-editor" className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Resultado Editable en Tiempo Real
                </label>
                <Chip
                  color="accent"
                  variant="soft"
                  size="sm"
                  className="font-semibold text-sm"
                >
                  {Object.values(values).filter(Boolean).length}/{variables.length} completadas
                </Chip>
              </div>

              <textarea
                id="variable-live-editor"
                rows={14}
                value={finalContent}
                onChange={(e) => setTemplateDraft(e.target.value)}
                className="flex-1 w-full bg-default/30 border border-border focus:border-accent focus:outline-none rounded-2xl p-5 font-mono-code text-base text-foreground leading-relaxed overflow-y-auto min-h-[280px] max-h-[460px] resize-y"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-surface-secondary/40 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-muted">
            Listo para usar en <strong className="text-foreground">ChatGPT</strong>,{" "}
            <strong className="text-foreground">Claude</strong> o <strong className="text-foreground">Codex</strong>.
          </div>

          <div className="flex items-center justify-end flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-xl text-xs sm:text-sm text-muted hover:text-foreground min-h-[44px]"
            >
              Cancelar <Kbd className="ml-1 text-xs hidden sm:inline-flex">Esc</Kbd>
            </Button>

            <Button
              variant={copied ? "primary" : "secondary"}
              size="sm"
              onClick={() => handleCopy(false)}
              className="rounded-xl text-xs sm:text-sm font-medium transition-all min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1 shrink-0" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1 shrink-0" />
                  <span>Copiar</span>
                </>
              )}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleCopy(true)}
              className="rounded-xl text-xs sm:text-sm font-semibold shadow-xs min-h-[44px]"
            >
              <Zap className="w-4 h-4 mr-1 shrink-0" />
              <span>Copiar y Cerrar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
