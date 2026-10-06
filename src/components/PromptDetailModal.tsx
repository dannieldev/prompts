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
} from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#111827] border border-[#223352] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#1f2d47] flex items-center justify-between bg-[#131c2e]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(prompt.id)}
              className={`p-2 rounded-xl transition ${
                prompt.is_favorite
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-gray-800 text-gray-500 hover:text-amber-400"
              }`}
              title={prompt.is_favorite ? "Quitar de célebres" : "Marcar como célebre"}
            >
              <Star className={`w-5 h-5 ${prompt.is_favorite ? "fill-amber-400" : ""}`} />
            </button>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-[#182338] text-indigo-300 border border-[#223352] flex items-center gap-1">
                  <span>{CATEGORY_ICONS[prompt.category]}</span>
                  <span>{prompt.category}</span>
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <span>{formatDate(prompt.updated_at || prompt.created_at)}</span>
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{prompt.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(prompt);
              }}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-xl transition flex items-center gap-1 text-xs"
              title="Editar prompt"
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">Editar</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-xl transition"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {/* Description */}
          {prompt.description && (
            <div className="bg-[#0b0f17] border border-[#1e2a42] rounded-xl p-3.5 text-xs text-gray-300 leading-relaxed">
              <strong className="text-gray-400 block mb-1">Propósito & Caso de Uso:</strong>
              {prompt.description}
            </div>
          )}

          {/* AI Models & Tags Row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            {prompt.models && prompt.models.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Modelos recomendados:</span>
                </span>
                {prompt.models.map((m) => (
                  <span
                    key={m}
                    className="text-[11px] font-medium bg-gray-800 text-gray-200 px-2 py-0.5 rounded-md border border-gray-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}

            {prompt.tags && prompt.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <TagIcon className="w-3 h-3 text-gray-500" />
                {prompt.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-500/20"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Variables Alert */}
          {hasVariables && (
            <div className="bg-gradient-to-r from-indigo-950/50 to-violet-950/50 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-300">
                  <Zap className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Variables Dinámicas Detectadas</h4>
                  <p className="text-[11px] text-gray-300">
                    Este prompt tiene {variables.length} campos personalizables:{" "}
                    <span className="text-indigo-300 font-mono">
                      {variables.map((v) => `{{${v.key}}}`).join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onUseVariables(prompt);
                }}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5 shrink-0"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Rellenar Ahora</span>
              </button>
            </div>
          )}

          {/* Prompt Full Text */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Contenido Completo del Prompt
            </span>

            <div className="bg-[#0b0f17] border border-[#1f2d47] rounded-2xl p-5 font-mono-code text-xs text-gray-200 leading-relaxed overflow-y-auto max-h-[420px] whitespace-pre-wrap select-text">
              {prompt.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#131c2e] border-t border-[#1f2d47] flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-xl transition"
          >
            Cerrar
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDirect}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                copied
                  ? "bg-emerald-600 border-emerald-500 text-white font-semibold"
                  : "bg-[#1c273d] hover:bg-[#253554] border-[#293d63] text-gray-200"
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "¡Copiado!" : "Copiar Texto Crudo"}</span>
            </button>

            {hasVariables && (
              <button
                onClick={() => {
                  onClose();
                  onUseVariables(prompt);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition shadow-lg shadow-indigo-600/30"
              >
                <Zap className="w-4 h-4" />
                <span>Rellenar Variables</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
