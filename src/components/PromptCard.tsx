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
  Sliders,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Chip,
} from "@heroui/react";
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

  const getCategoryColor = (cat: string): "accent" | "success" | "warning" | "default" => {
    switch (cat) {
      case "Diseño Web IA":
        return "accent";
      case "Estrategia":
        return "success";
      case "Desarrollo":
        return "accent";
      case "Contenido":
      case "Marketing":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      variant="default"
      onClick={() => onViewDetail(prompt)}
      className="group relative flex flex-col justify-between bg-surface border border-border/90 hover:border-accent/70 rounded-3xl p-5 transition-all duration-200 hover:-translate-y-1.5 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-accent/10 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Card Header: Category & Controls */}
        <CardHeader className="flex items-center justify-between gap-2 p-0 mb-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Chip
              color={getCategoryColor(prompt.category)}
              variant="soft"
              size="sm"
              className="font-semibold text-[11px] px-2.5 py-0.5"
            >
              <span className="mr-1">{CATEGORY_ICONS[prompt.category] || "📌"}</span>
              <span>{prompt.category}</span>
            </Chip>

            {/* Model Badges */}
            {prompt.models?.slice(0, 2).map((m) => (
              <Chip
                key={m}
                variant="secondary"
                size="sm"
                className="text-[10px]"
              >
                <Bot className="w-2.5 h-2.5 inline mr-1 text-muted" />
                <span>{m}</span>
              </Chip>
            ))}
          </div>

          {/* Favorite Toggle Button */}
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onToggleFavorite(prompt.id);
            }}
            className={`rounded-xl transition-all ${
              prompt.is_favorite
                ? "text-amber-400 bg-amber-500/15"
                : "text-muted hover:text-amber-400 hover:bg-default/40"
            }`}
            aria-label={prompt.is_favorite ? "Quitar de célebres" : "Marcar como célebre"}
          >
            <Star className={`w-4 h-4 ${prompt.is_favorite ? "fill-amber-400" : ""}`} />
          </Button>
        </CardHeader>

        {/* Card Content: Title, Description, Snippet */}
        <CardContent className="p-0 space-y-2.5">
          <CardTitle className="text-base font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {prompt.title}
          </CardTitle>

          {prompt.description && (
            <CardDescription className="text-xs text-muted line-clamp-2 leading-relaxed">
              {prompt.description}
            </CardDescription>
          )}

          {/* Dynamic Variables Pill if detected */}
          {hasVariables && (
            <div className="pt-0.5">
              <Chip
                color="accent"
                variant="soft"
                size="sm"
                className="flex items-center gap-1.5 text-[11px] font-medium"
              >
                <Zap className="w-3 h-3 inline mr-1 text-accent" />
                <span>
                  {variables.length} {variables.length === 1 ? "variable" : "variables"}:
                </span>
                <span className="text-accent-foreground font-mono text-[10px] ml-1">
                  {variables.slice(0, 3).map((v) => `{{${v.key}}}`).join(", ")}
                  {variables.length > 3 ? "..." : ""}
                </span>
              </Chip>
            </div>
          )}

          {/* Snippet Code Preview Box */}
          <div className="bg-surface-secondary/80 border border-border/80 rounded-2xl p-3.5 font-mono-code text-[11px] text-foreground/90 leading-relaxed overflow-hidden relative shadow-inner">
            <pre className="whitespace-pre-wrap line-clamp-3 select-none font-inherit">
              {previewLines}
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-surface-secondary/80 to-transparent pointer-events-none" />
          </div>

          {/* Tags Row */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {prompt.tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="secondary"
                  size="sm"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onSelectTag(tag);
                  }}
                  className="cursor-pointer text-[10px] border border-border/60 hover:border-accent/60 transition"
                >
                  #{tag}
                </Chip>
              ))}
            </div>
          )}
        </CardContent>
      </div>

      {/* Card Footer: Action Buttons */}
      <CardFooter
        className="flex items-center justify-between gap-2 p-0 pt-4 mt-3 border-t border-border/80"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onClick={() => onEdit(prompt)}
            className="text-muted hover:text-foreground rounded-xl"
            aria-label="Editar prompt"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onClick={() => onDelete(prompt.id, prompt.title)}
            className="text-muted hover:text-danger rounded-xl"
            aria-label="Eliminar prompt"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onClick={() => onViewDetail(prompt)}
            className="text-muted hover:text-accent rounded-xl"
            aria-label="Ver prompt completo"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Copy Button */}
          <Button
            variant={copied ? "primary" : "outline"}
            size="sm"
            onClick={handleCopy}
            className={`rounded-xl text-xs font-medium transition-all ${
              copied ? "shadow-sm shadow-accent/20" : "border-border/80 hover:bg-surface-secondary"
            }`}
            aria-label="Copiar prompt"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" />
                <span>Copiar</span>
              </>
            )}
          </Button>

          {/* Fill & Use Button */}
          {hasVariables ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onUseVariables(prompt)}
              className="rounded-xl text-xs font-semibold shadow-md shadow-accent/25"
              aria-label="Rellenar variables"
            >
              <Sliders className="w-3.5 h-3.5 mr-1" />
              <span>Rellenar</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleCopy}
              className="rounded-xl text-xs font-semibold shadow-md shadow-accent/25"
              aria-label="Usar prompt"
            >
              <span>Usar</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
