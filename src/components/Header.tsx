import React, { useRef, useEffect } from "react";
import { Plus, Download, Search, X } from "lucide-react";

interface HeaderProps {
  currentView: "prompts" | "manual";
  onViewChange: (view: "prompts" | "manual") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalCount: number;
  filteredCount: number;
  onNewPrompt: () => void;
  onOpenExportImport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, searchQuery, onSearchChange, totalCount, onNewPrompt, onOpenExportImport }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]') || document.querySelector('[role="dialog"]')) return;
      const command = e.metaKey || e.ctrlKey;
      if (e.key === "/" || (command && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        onViewChange("prompts");
        requestAnimationFrame(() => searchInputRef.current?.focus());
      } else if (!command && !e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        onNewPrompt();
      } else if (!command && !e.altKey && e.key.toLowerCase() === "g") {
        onViewChange(currentView === "manual" ? "prompts" : "manual");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentView, onViewChange, onNewPrompt]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, view: "prompts" | "manual") => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onViewChange(view);
  };

  return <>
    <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" onClick={(e) => navigate(e, "prompts")} aria-label="Prompts Célebres, inicio">
          <img className="brand-mark" src="/favicon.svg" width="40" height="40" alt="" />
          <span>Prompts <span className="brand-subtitle">Célebres</span></span>
        </a>
        <nav className="primary-nav" aria-label="Navegación principal">
          <a href="/" aria-current={currentView === "prompts" ? "page" : undefined} onClick={(e) => navigate(e, "prompts")}>Biblioteca</a>
          <a href="/manual" aria-current={currentView === "manual" ? "page" : undefined} onClick={(e) => navigate(e, "manual")}>Manual web</a>
        </nav>
        <div className="header-actions">
          <button className="quiet-button backup-button" onClick={onOpenExportImport} aria-label="Respaldar datos"><Download size={18} aria-hidden="true" /><span>Respaldos</span></button>
          <button className="primary-button" onClick={onNewPrompt}><Plus size={18} aria-hidden="true" /><span>Nuevo prompt</span></button>
        </div>
      </div>
    </header>
    {currentView === "prompts" && <section className="library-intro page-width" aria-labelledby="library-title">
      <div className="library-heading">
        <div><h1 id="library-title">Una buena idea empieza aquí.</h1><p>Tu colección de prompts, lista para encontrar, adaptar y usar.</p></div>
        <span className="collection-count">{totalCount} prompts en tu biblioteca</span>
      </div>
      <div className="library-search" role="search">
        <Search size={22} aria-hidden="true" />
        <input ref={searchInputRef} type="search" name="search" aria-label="Buscar prompts" autoComplete="off" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Busca por tema, título o una idea…" />
        {searchQuery ? <button className="icon-button" aria-label="Limpiar búsqueda" onClick={() => onSearchChange("")}><X size={18} aria-hidden="true" /></button> : <kbd>⌘ K / Ctrl K</kbd>}
      </div>
    </section>}
  </>;
};
