import React, { useRef, useEffect } from "react";
import { Search, Plus, Database, HardDrive, Download, X, BookOpen } from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";
import { StorageMode } from "../lib/api";

interface HeaderProps {
  currentView: "prompts" | "manual";
  onViewChange: (view: "prompts" | "manual") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  storageMode: StorageMode;
  totalCount: number;
  filteredCount: number;
  onNewPrompt: () => void;
  onOpenExportImport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  storageMode,
  totalCount,
  filteredCount,
  onNewPrompt,
  onOpenExportImport,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/' or 'Cmd+K' / 'Ctrl+K' when not in another input
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        if (currentView !== "prompts") {
          onViewChange("prompts");
        }
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }

      // Shortcut 'N' for new prompt
      if (
        e.key.toLowerCase() === "n" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        onNewPrompt();
      }

      // Shortcut 'G' for Web Guide / Manual toggle
      if (
        e.key.toLowerCase() === "g" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        onViewChange(currentView === "manual" ? "prompts" : "manual");
      }

      // Shortcut 'Escape' to go back to prompts if in manual
      if (
        e.key === "Escape" &&
        currentView === "manual" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        onViewChange("prompts");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentView, onViewChange, onNewPrompt]);

  return (
    <header className="sticky top-0 z-30 bg-[#090d16]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 lg:px-8 py-3 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5">
        {/* Brand Logo & Navigation Segmented Switcher */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div
            onClick={() => onViewChange("prompts")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white font-black text-xl select-none transition-transform group-hover:scale-105 active:scale-95 duration-150">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white font-sans">
                  Prompts
                </h1>
                <Chip
                  color="accent"
                  variant="soft"
                  size="sm"
                  className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5"
                >
                  Célebres
                </Chip>
              </div>
              <p className="text-xs text-slate-400 font-medium">Bóveda de prompts probados y reusables</p>
            </div>
          </div>

          {/* HeroUI Segmented Tabs Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#101626] border border-white/[0.08] rounded-2xl shadow-inner">
            <button
              onClick={() => onViewChange("prompts")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                currentView === "prompts"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span>Prompts</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  currentView === "prompts"
                    ? "bg-white/20 text-white"
                    : "bg-white/[0.06] text-slate-400"
                }`}
              >
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => onViewChange("manual")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                currentView === "manual"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
              title="Manual de Creación Web Anti-Genérica con IA (Atajo: G)"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Manual Web</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md hidden sm:inline ${
                  currentView === "manual"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                }`}
              >
                12 Caps
              </span>
            </button>
          </div>
        </div>

        {/* HeroUI Omnibox Search Bar (Prompts Mode) or Quick Switcher Hint */}
        <div className="relative flex-1 max-w-2xl w-full">
          {currentView === "prompts" ? (
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar por título, contenido, tag o modelo... (Presiona '/' para buscar)"
                className="w-full bg-[#101626] text-slate-100 placeholder-slate-500 text-sm rounded-2xl pl-10 pr-24 py-2.5 border border-white/[0.08] focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-inner"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange("")}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition min-w-[28px] min-h-[28px] flex items-center justify-center"
                    aria-label="Limpiar búsqueda"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="hidden sm:inline-flex items-center gap-1">
                    <Kbd className="text-[10px]">⌘K</Kbd>
                    <Kbd className="text-[10px]">/</Kbd>
                  </div>
                )}
                <span className="text-[11px] font-semibold text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-lg border border-white/[0.06] select-none">
                  {filteredCount}/{totalCount}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[#101626] text-slate-300 text-xs rounded-2xl px-4 py-2.5 border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Manual Maestro de Creación Web Anti-Genérica</span>
                <span className="text-slate-500 hidden sm:inline">· 12 Capítulos Prácticos</span>
              </div>
              <button
                onClick={() => onViewChange("prompts")}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 active:scale-95 transition"
              >
                <span>Explorar Prompts</span>
                <Kbd className="text-[9px]">/</Kbd>
              </button>
            </div>
          )}
        </div>

        {/* HeroUI Action Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Storage status chip (desktop) */}
          <div className="hidden md:flex items-center">
            {storageMode === "d1" ? (
              <Chip
                color="success"
                variant="soft"
                size="sm"
                className="flex items-center gap-1.5 font-semibold"
              >
                <Database className="w-3 h-3 inline mr-1 text-emerald-400" />
                <span>Cloudflare D1</span>
              </Chip>
            ) : (
              <Chip
                color="warning"
                variant="soft"
                size="sm"
                className="flex items-center gap-1.5 font-semibold"
              >
                <HardDrive className="w-3 h-3 inline mr-1 text-amber-400" />
                <span>Local Cache</span>
              </Chip>
            )}
          </div>

          {/* Export / Import Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenExportImport}
            className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] rounded-xl"
            aria-label="Respaldar datos"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Respaldar</span>
          </Button>

          {/* New Prompt Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (currentView !== "prompts") onViewChange("prompts");
              onNewPrompt();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/30"
            aria-label="Nuevo Prompt"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Prompt</span>
            <Kbd className="hidden lg:inline-block text-[9px] bg-white/20 border-white/20 text-white ml-1">
              N
            </Kbd>
          </Button>
        </div>
      </div>
    </header>
  );
};
