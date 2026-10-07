import React, { useState, useEffect } from "react";
import { X, Copy, Check, Zap, RotateCcw, Eye, Sparkles } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c101d] border border-white/[0.1] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0e1424]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Rellenar Variables Dinámicas</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                  {variables.length} {variables.length === 1 ? "campo" : "campos"}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{prompt.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 active:scale-95 transition ${
                showPreview
                  ? "bg-indigo-950/60 border-indigo-500/40 text-indigo-300"
                  : "bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white"
              }`}
              title="Alternar vista previa en vivo"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vista Previa</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] active:scale-95 rounded-xl transition"
              title="Restablecer todos los campos"
              aria-label="Restablecer campos"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] active:scale-95 rounded-xl transition"
              title="Cerrar modal (Esc)"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body (Form + Live Preview) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Variables del Prompt
              </span>
              <span className="text-[11px] text-slate-500">
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
                  className="bg-[#07090e] border border-white/[0.08] rounded-xl p-3.5 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-200">
                      {v.label}
                    </label>
                    <code className="text-[10px] text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-500/25 font-mono">
                      {`{{${v.key}}}`}
                    </code>
                  </div>

                  {isLong ? (
                    <textarea
                      rows={3}
                      value={values[v.key] || ""}
                      onChange={(e) => handleInputChange(v.key, e.target.value)}
                      placeholder={`Escribe o pega el contenido para ${v.label.toLowerCase()}...`}
                      className="w-full bg-[#0d121f] text-slate-100 placeholder-slate-600 text-xs rounded-lg p-2.5 border border-white/[0.06] focus:outline-none focus:border-indigo-500 font-mono-code transition"
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[v.key] || ""}
                      onChange={(e) => handleInputChange(v.key, e.target.value)}
                      placeholder={`Ej: ${v.label}...`}
                      className="w-full bg-[#0d121f] text-slate-100 placeholder-slate-600 text-xs rounded-lg px-2.5 py-2 border border-white/[0.06] focus:outline-none focus:border-indigo-500 transition"
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
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Resultado en Tiempo Real
                </span>
                <span className="text-[11px] text-indigo-400 font-semibold">
                  {Object.values(values).filter(Boolean).length}/{variables.length} completadas
                </span>
              </div>

              <div className="flex-1 bg-[#07090e] border border-white/[0.08] rounded-2xl p-4 font-mono-code text-xs text-slate-300 leading-relaxed overflow-y-auto max-h-[460px] whitespace-pre-wrap select-text">
                {generatedContent}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0e1424] border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-400">
            Listo para pegar directamente en <strong className="text-slate-200">ChatGPT</strong>,{" "}
            <strong className="text-slate-200">Claude</strong> o <strong className="text-slate-200">Codex</strong>.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] active:scale-95 rounded-xl transition"
            >
              Cancelar
            </button>

            <button
              onClick={() => handleCopy(false)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border active:scale-95 transition-all ${
                copied
                  ? "bg-emerald-600 border-emerald-500 text-white font-semibold"
                  : "bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] text-slate-200"
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "¡Copiado!" : "Copiar"}</span>
            </button>

            <button
              onClick={() => handleCopy(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition shadow-md shadow-indigo-600/30"
            >
              <Zap className="w-4 h-4" />
              <span>Copiar y Cerrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
