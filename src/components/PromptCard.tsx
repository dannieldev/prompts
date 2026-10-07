import React, { useState } from "react";
import {
  Star,
  Copy,
  Check,
  Zap,
  Edit2,
  Trash2,
  ExternalLink,
  Bot,
} from "lucide-react";
import { PromptItem } from "../types";
import { CATEGORY_ICONS } from "../lib/constants";
import { extractVariables } from "../lib/variableUtils";

interface PromptCardProps {
  prompt: PromptItem;
  onCopyDirect: (content: string, title: string) => void;
  onUseVariables: (prompt: PromptItem) => void;
  onViewDetail: (prompt: PromptItem) => void;
  onEdit: (prompt: PromptItem) => void;
  onDelete: (id: string, title: string) => void;
  onToggleFavorite: (id: string) => void;
  onSelectTag: (tag: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onCopyDirect,
  onUseVariables,
  onViewDetail,
  onEdit,
  onDelete,
  onToggleFavorite,
  onSelectTag,
}) => {
  const [copied, setCopied] = useState(false);
  const variables = extractVariables(prompt.content);
  const hasVariables = variables.length > 0;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyDirect(prompt.content, prompt.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Preview snippet (first 3-4 lines)
  const previewLines = prompt.content.split("\n").slice(0, 4).join("\n");

  return (
    <div
      onClick={() => onViewDetail(prompt)}
      className="group relative flex flex-col justify-between bg-[#0e1320]/90 hover:bg-[#111828] border border-white/[0.08] hover:border-indigo-500/35 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-xl hover:shadow-black/40 cursor-pointer"
    >
      <div>
        {/* Header: Category & Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/[0.04] text-indigo-300 border border-white/[0.08] flex items-center gap-1">
              <span>{CATEGORY_ICONS[prompt.category] || "📌"}</span>
              <span>{prompt.category}</span>
            </span>

            {/* Models badges */}
            {prompt.models?.slice(0, 2).map((m) => (
              <span
                key={m}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.06] flex items-center gap-1"
              >
                <Bot className="w-2.5 h-2.5 text-slate-400" />
                <span>{m}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(prompt.id);
              }}
              className={`p-1.5 rounded-lg transition-transform active:scale-90 ${
                prompt.is_favorite
                  ? "text-amber-400 hover:text-amber-300 bg-amber-500/15 border border-amber-500/25"
                  : "text-slate-500 hover:text-amber-400 hover:bg-white/[0.05]"
              }`}
              title={prompt.is_favorite ? "Quitar de célebres" : "Marcar como célebre"}
              aria-label={prompt.is_favorite ? "Quitar de célebres" : "Marcar como célebre"}
            >
              <Star
                className={`w-4 h-4 ${prompt.is_favorite ? "fill-amber-400" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-200 transition-colors line-clamp-1 mb-1.5">
          {prompt.title}
        </h3>

        {/* Short description */}
        {prompt.description && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed font-normal">
            {prompt.description}
          </p>
        )}

        {/* Dynamic Variables Pill if detected */}
        {hasVariables && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-indigo-950/50 border border-indigo-500/25 text-indigo-300">
              <Zap className="w-3 h-3 text-indigo-400" />
              <span>
                {variables.length} {variables.length === 1 ? "variable" : "variables"}:
              </span>
              <span className="text-indigo-200 font-mono text-[10px]">
                {variables.slice(0, 3).map((v) => `{{${v.key}}}`).join(", ")}
                {variables.length > 3 ? "..." : ""}
              </span>
            </span>
          </div>
        )}

        {/* Content Preview Box */}
        <div className="bg-[#07090e] border border-white/[0.06] rounded-xl p-3 font-mono-code text-[11px] text-slate-300/90 leading-relaxed overflow-hidden relative mb-3.5">
          <pre className="whitespace-pre-wrap line-clamp-3 select-none font-inherit">
            {previewLines}
          </pre>
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#07090e] to-transparent pointer-events-none" />
        </div>

        {/* Tags Row */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {prompt.tags.map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTag(tag);
                }}
                className="text-[10px] text-slate-400 hover:text-indigo-300 bg-white/[0.03] hover:bg-white/[0.06] px-2 py-0.5 rounded-md border border-white/[0.06] transition"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div
        className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.06]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(prompt)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] active:scale-95 transition"
            title="Editar prompt"
            aria-label="Editar prompt"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(prompt.id, prompt.title)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 transition"
            title="Eliminar prompt"
            aria-label="Eliminar prompt"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewDetail(prompt)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-white/[0.06] active:scale-95 transition"
            title="Ver completo"
            aria-label="Ver prompt completo"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium active:scale-95 transition-all ${
              copied
                ? "bg-emerald-600 text-white font-semibold shadow-xs"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08]"
            }`}
            title="Copiar texto sin modificar"
            aria-label="Copiar prompt"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>

          {/* Fill & Use Button (if has variables) */}
          {hasVariables ? (
            <button
              onClick={() => onUseVariables(prompt)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition shadow-sm shadow-indigo-600/25"
              title="Rellenar variables antes de copiar"
              aria-label="Rellenar variables"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Rellenar</span>
            </button>
          ) : (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition shadow-sm shadow-indigo-600/25"
              aria-label="Usar prompt"
            >
              <span>Usar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
