import React, { useRef, useEffect } from "react";
import { Search, Plus, Database, HardDrive, Download, X } from "lucide-react";
import { StorageMode } from "../lib/api";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  storageMode: StorageMode;
  totalCount: number;
  filteredCount: number;
  onNewPrompt: () => void;
  onOpenExportImport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
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
        searchInputRef.current?.focus();
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNewPrompt]);

  return (
    <header className="sticky top-0 z-30 bg-[#0b0f17]/90 backdrop-blur-md border-b border-[#1e293b] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xl select-none">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">Prompts</h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Célebres
                </span>
              </div>
              <p className="text-xs text-gray-400">Bóveda de prompts probados y reusables</p>
            </div>
          </div>

          {/* Sync status indicator on mobile */}
          <div className="flex md:hidden items-center gap-2">
            <span
              className={`text-[11px] font-medium px-2 py-1 rounded-md border flex items-center gap-1.5 ${
                storageMode === "d1"
                  ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/30"
                  : "bg-amber-950/40 text-amber-300 border-amber-500/30"
              }`}
            >
              {storageMode === "d1" ? <Database className="w-3 h-3 text-emerald-400" /> : <HardDrive className="w-3 h-3 text-amber-400" />}
              {storageMode === "d1" ? "D1 Cloud" : "Local"}
            </span>
          </div>
        </div>

        {/* Omnibox Search Bar */}
        <div className="relative flex-1 max-w-2xl w-full">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por título, contenido, tag o modelo... (Presiona '/' para buscar)"
              className="w-full bg-[#111827] text-gray-100 placeholder-gray-500 text-sm rounded-xl pl-10 pr-24 py-2.5 border border-[#1f293d] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            />
            <div className="absolute right-2.5 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange("")}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition"
                  title="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-800 border border-gray-700 rounded shadow-sm">
                  /
                </kbd>
              )}
              <span className="text-[11px] font-medium text-gray-500 bg-gray-900/80 px-2 py-0.5 rounded border border-gray-800 select-none">
                {filteredCount}/{totalCount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Storage status badge (desktop) */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${
              storageMode === "d1"
                ? "bg-emerald-950/30 text-emerald-300 border-emerald-500/20"
                : "bg-amber-950/30 text-amber-300 border-amber-500/20"
            }`}
            title={
              storageMode === "d1"
                ? "Sincronizado con Cloudflare D1 en tiempo real"
                : "Modo almacenamiento local en navegador (autónomo y offline)"
            }
          >
            {storageMode === "d1" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloudflare D1</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>Almacenamiento Local</span>
              </>
            )}
          </div>

          {/* Export / Import Button */}
          <button
            onClick={onOpenExportImport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-300 bg-[#161f30] hover:bg-[#1f2b42] border border-[#243350] rounded-xl transition shadow-sm"
            title="Exportar respaldo JSON o importar prompts"
          >
            <Download className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden sm:inline">Respaldar</span>
          </button>

          {/* New Prompt Button */}
          <button
            onClick={onNewPrompt}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] rounded-xl transition shadow-lg shadow-indigo-600/30"
            title="Crear un nuevo prompt (Atajo: N)"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Prompt</span>
            <kbd className="hidden lg:inline text-[9px] font-mono px-1 py-0.2 bg-indigo-700/60 rounded text-indigo-200 ml-1">
              N
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
