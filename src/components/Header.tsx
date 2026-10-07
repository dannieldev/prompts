import React, { useRef, useEffect } from "react";
import { Plus, Database, HardDrive, Download, BookOpen } from "lucide-react";
import { Button, Chip, Kbd, Tabs, SearchField } from "@heroui/react";
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
    <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur-xl border-b border-border/80 px-4 lg:px-8 py-3 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5">
        {/* Brand Logo & Navigation Segmented Switcher */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div
            onClick={() => onViewChange("prompts")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent via-indigo-600 to-accent flex items-center justify-center shadow-lg shadow-accent/25 text-white font-black text-xl select-none transition-transform group-hover:scale-105 active:scale-95 duration-150">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-foreground font-sans">
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
              <p className="text-xs text-muted font-medium">Bóveda de prompts probados y reusables</p>
            </div>
          </div>

          {/* HeroUI Segmented Tabs Switcher */}
          <Tabs
            selectedKey={currentView}
            onSelectionChange={(key) => onViewChange(key as "prompts" | "manual")}
            variant="secondary"
            className="w-auto"
          >
            <Tabs.ListContainer className="p-1 rounded-2xl">
              <Tabs.List className="gap-1">
                <Tabs.Tab
                  id="prompts"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                >
                  <span>Prompts</span>
                  <Chip size="sm" variant="secondary" className="text-[10px] h-4 min-h-0 px-1 font-mono">
                    {totalCount}
                  </Chip>
                </Tabs.Tab>

                <Tabs.Tab
                  id="manual"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Manual Web</span>
                  <Chip
                    size="sm"
                    color="success"
                    variant="soft"
                    className="text-[10px] h-4 min-h-0 px-1 font-mono hidden sm:inline-flex"
                  >
                    12 Caps
                  </Chip>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>

        {/* HeroUI SearchField Omnibox or Quick Switcher Hint */}
        <div className="relative flex-1 max-w-2xl w-full">
          {currentView === "prompts" ? (
            <SearchField
              value={searchQuery}
              onChange={onSearchChange}
              variant="secondary"
              className="w-full"
              aria-label="Buscar prompts"
            >
              <SearchField.Group className="h-10 rounded-2xl border border-border/80 bg-default/40 hover:bg-default/60 focus-within:bg-default/80 transition-all shadow-inner px-3">
                <SearchField.SearchIcon className="text-muted w-4 h-4 mr-2 shrink-0" />
                <SearchField.Input
                  ref={searchInputRef}
                  placeholder="Buscar por título, contenido, tag o modelo... (Presiona '/' para buscar)"
                  className="text-sm text-foreground placeholder:text-muted bg-transparent focus:outline-none flex-1"
                />
                <div className="flex items-center gap-1.5 ml-2 shrink-0">
                  {searchQuery ? (
                    <SearchField.ClearButton />
                  ) : (
                    <div className="hidden sm:inline-flex items-center gap-1">
                      <Kbd className="text-[10px]">⌘K</Kbd>
                      <Kbd className="text-[10px]">/</Kbd>
                    </div>
                  )}
                  <span className="text-[11px] font-semibold text-muted bg-default px-2 py-0.5 rounded-lg border border-border/50 select-none">
                    {filteredCount}/{totalCount}
                  </span>
                </div>
              </SearchField.Group>
            </SearchField>
          ) : (
            <div className="flex items-center justify-between bg-surface-secondary text-foreground text-xs rounded-2xl px-4 py-2.5 border border-border/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="font-semibold text-foreground">Manual Maestro de Creación Web Anti-Genérica</span>
                <span className="text-muted hidden sm:inline">· 12 Capítulos Prácticos</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange("prompts")}
                className="text-xs text-accent hover:text-accent font-semibold flex items-center gap-1 rounded-xl h-7 px-2"
              >
                <span>Explorar Prompts</span>
                <Kbd className="text-[9px]">/</Kbd>
              </Button>
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
                <Database className="w-3 h-3 inline mr-1 text-success" />
                <span>Cloudflare D1</span>
              </Chip>
            ) : (
              <Chip
                color="warning"
                variant="soft"
                size="sm"
                className="flex items-center gap-1.5 font-semibold"
              >
                <HardDrive className="w-3 h-3 inline mr-1 text-warning" />
                <span>Local Cache</span>
              </Chip>
            )}
          </div>

          {/* Export / Import Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenExportImport}
            className="flex items-center gap-1.5 text-xs rounded-2xl"
            aria-label="Respaldar datos"
          >
            <Download className="w-3.5 h-3.5 text-muted" />
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
            className="flex items-center gap-1.5 text-xs font-semibold rounded-2xl shadow-md"
            aria-label="Nuevo Prompt"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Prompt</span>
            <Kbd className="hidden lg:inline-block text-[9px] ml-1">
              N
            </Kbd>
          </Button>
        </div>
      </div>
    </header>
  );
};
