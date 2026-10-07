import { useState, useEffect, useMemo } from "react";
import {
  PromptItem,
  PromptInput,
  PromptCategory,
  AIModelTag,
} from "./types";
import { promptApi, StorageMode } from "./lib/api";
import { Header } from "./components/Header";
import { CategoryFilter } from "./components/CategoryFilter";
import { PromptCard } from "./components/PromptCard";
import { VariableModal } from "./components/VariableModal";
import { PromptEditorModal } from "./components/PromptEditorModal";
import { PromptDetailModal } from "./components/PromptDetailModal";
import { ExportImportModal } from "./components/ExportImportModal";
import { ManualPage } from "./components/ManualPage";
import { ToastContainer, ToastMessage } from "./components/Toast";
import { SEED_PROMPTS } from "./lib/seedData";
import { SearchX, Plus, RefreshCw } from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";

function getInitialView(): "prompts" | "manual" {
  if (typeof window === "undefined") return "prompts";
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (
    path.startsWith("/manual") ||
    path.startsWith("/guia") ||
    hash.includes("manual") ||
    hash.includes("guia")
  ) {
    return "manual";
  }
  return "prompts";
}

export function App() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [storageMode, setStorageMode] = useState<StorageMode>("local");
  const [currentView, setCurrentView] = useState<"prompts" | "manual">(getInitialView);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | "Todas">("Todas");
  const [selectedModel, setSelectedModel] = useState<AIModelTag | "Todos">("Todos");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Modals state
  const [variablePrompt, setVariablePrompt] = useState<PromptItem | null>(null);
  const [detailPrompt, setDetailPrompt] = useState<PromptItem | null>(null);
  const [editorPrompt, setEditorPrompt] = useState<PromptItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync current view with URL history
  const handleViewChange = (view: "prompts" | "manual") => {
    setCurrentView(view);
    const targetPath = view === "manual" ? "/manual" : "/";
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, "", targetPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  // Load prompts on start
  const loadPrompts = async () => {
    setLoading(true);
    try {
      const items = await promptApi.getAllPrompts();
      setPrompts(items);
      setStorageMode(promptApi.getMode());
    } catch (err: any) {
      addToast("Error al cargar los prompts: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    promptApi.setOnModeChange((mode) => setStorageMode(mode));
    loadPrompts();
  }, []);

  // Compute available tags from all prompts
  const availableTags = useMemo(() => {
    const tagCount: Record<string, number> = {};
    prompts.forEach((p) => {
      p.tags?.forEach((t) => {
        tagCount[t] = (tagCount[t] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [prompts]);

  const favoritesCount = useMemo(() => {
    return prompts.filter((p) => p.is_favorite).length;
  }, [prompts]);

  // Filtering & Sorting
  const filteredPrompts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return prompts.filter((p) => {
      // 1. Favorites only
      if (showFavoritesOnly && !p.is_favorite) return false;

      // 2. Category filter
      if (selectedCategory !== "Todas" && p.category !== selectedCategory) return false;

      // 3. Model filter
      if (
        selectedModel !== "Todos" &&
        !p.models?.some((m) => m.toLowerCase().includes(selectedModel.toLowerCase()))
      ) {
        return false;
      }

      // 4. Tag filter
      if (selectedTag && !p.tags?.includes(selectedTag)) return false;

      // 5. Search query (title, description, content, tags, models)
      if (query) {
        const inTitle = p.title.toLowerCase().includes(query);
        const inDesc = p.description.toLowerCase().includes(query);
        const inContent = p.content.toLowerCase().includes(query);
        const inTags = p.tags?.some((t) => t.toLowerCase().includes(query));
        const inModels = p.models?.some((m) => m.toLowerCase().includes(query));
        return inTitle || inDesc || inContent || inTags || inModels;
      }

      return true;
    });
  }, [
    prompts,
    searchQuery,
    selectedCategory,
    selectedModel,
    showFavoritesOnly,
    selectedTag,
  ]);

  // Actions
  const handleToggleFavorite = async (id: string) => {
    try {
      const isFav = await promptApi.toggleFavorite(id);
      setPrompts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_favorite: isFav } : p))
      );
      if (detailPrompt && detailPrompt.id === id) {
        setDetailPrompt((prev) => (prev ? { ...prev, is_favorite: isFav } : null));
      }
      addToast(
        isFav ? "Marcado como Célebre ⭐" : "Removido de Célebres",
        "info"
      );
    } catch {
      addToast("No se pudo actualizar favorito", "error");
    }
  };

  const handleCopyDirect = (content: string, title: string) => {
    navigator.clipboard.writeText(content);
    addToast(`¡Prompt "${title}" copiado al portapapeles!`, "success");
  };

  const handleSavePrompt = async (data: PromptInput, existingId?: string) => {
    if (existingId) {
      const updated = await promptApi.updatePrompt(existingId, data);
      setPrompts((prev) => prev.map((p) => (p.id === existingId ? updated : p)));
      if (detailPrompt?.id === existingId) setDetailPrompt(updated);
      addToast(`Prompt "${updated.title}" actualizado`, "success");
    } else {
      const created = await promptApi.createPrompt(data);
      setPrompts((prev) => [created, ...prev]);
      addToast(`Prompt "${created.title}" creado`, "success");
    }
  };

  const handleDeletePrompt = async (id: string, title: string) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${title}"?`)) return;

    try {
      await promptApi.deletePrompt(id);
      setPrompts((prev) => prev.filter((p) => p.id !== id));
      if (detailPrompt?.id === id) setDetailPrompt(null);
      addToast(`Prompt "${title}" eliminado`, "info");
    } catch (err: any) {
      addToast("Error al eliminar: " + err.message, "error");
    }
  };

  const handleImport = async (items: PromptItem[]) => {
    const count = await promptApi.importData(items);
    await loadPrompts();
    return count;
  };

  const handleResetSeed = async () => {
    await promptApi.importData(SEED_PROMPTS);
    await loadPrompts();
  };

  // Switch to prompts view and open prompt if selected from Manual
  const handleSelectPromptFromManual = (promptId: string) => {
    handleViewChange("prompts");
    const target = prompts.find((p) => p.id === promptId);
    if (target) {
      setVariablePrompt(target);
    } else {
      setSearchQuery(promptId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-white font-sans">
      {/* Top Navigation */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        storageMode={storageMode}
        totalCount={prompts.length}
        filteredCount={filteredPrompts.length}
        onNewPrompt={() => {
          setEditorPrompt(null);
          setIsEditorOpen(true);
        }}
        onOpenExportImport={() => setIsExportImportOpen(true)}
      />

      {/* Render Main Content depending on active subpage view */}
      {currentView === "manual" ? (
        <ManualPage
          onNavigateToPrompts={() => handleViewChange("prompts")}
          onSelectPrompt={handleSelectPromptFromManual}
          onAddToast={addToast}
        />
      ) : (
        <>
          {/* Categories & Filter Bar */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
            selectedTag={selectedTag}
            onClearTag={() => setSelectedTag(null)}
            favoritesCount={favoritesCount}
            availableTags={availableTags}
            onSelectTag={(tag) => setSelectedTag(tag)}
          />

          {/* Main Grid View */}
          <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-8 py-4 w-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-muted gap-3">
                <RefreshCw className="w-8 h-8 text-accent animate-spin" />
                <p className="text-sm font-medium">Cargando prompts célebres...</p>
              </div>
            ) : filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onCopyDirect={handleCopyDirect}
                    onUseVariables={(p) => setVariablePrompt(p)}
                    onViewDetail={(p) => setDetailPrompt(p)}
                    onEdit={(p) => {
                      setEditorPrompt(p);
                      setIsEditorOpen(true);
                    }}
                    onDelete={handleDeletePrompt}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectTag={(tag) => setSelectedTag(tag)}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search / Filter State with HeroUI components */
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-default/40 border border-border flex items-center justify-center text-muted mb-4 shadow-xl">
                  <SearchX className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1.5">
                  No se encontraron prompts
                </h3>
                <p className="text-xs text-muted mb-6 leading-relaxed">
                  No hay resultados que coincidan con tus criterios de búsqueda o filtros activos.
                </p>
                <div className="flex items-center gap-2.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Todas");
                      setSelectedModel("Todos");
                      setShowFavoritesOnly(false);
                      setSelectedTag(null);
                    }}
                    className="rounded-2xl text-xs"
                  >
                    Limpiar filtros
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setEditorPrompt(null);
                      setIsEditorOpen(true);
                    }}
                    className="rounded-2xl text-xs font-semibold shadow-md"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Crear nuevo</span>
                  </Button>
                </div>
              </div>
            )}
          </main>

          {/* Prompts Footer with HeroUI components */}
          <footer className="border-t border-border/60 py-6 px-4 text-center text-xs text-muted mt-auto bg-surface/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">⚡ Prompts Célebres</span>
                <span>·</span>
                <span>Colección personal de @dannieldev</span>
              </div>
              <div className="flex items-center gap-3 text-muted text-[11px]">
                <Chip color="success" variant="soft" size="sm" className="text-[10px]">
                  Cloudflare Workers + D1
                </Chip>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <span>Atajo:</span>
                  <Kbd className="text-[10px]">/</Kbd>
                  <span>o</span>
                  <Kbd className="text-[10px]">⌘K</Kbd>
                  <span>para buscar</span>
                </span>
              </div>
            </div>
          </footer>
        </>
      )}


      {/* Interactive Variable Filling Modal */}
      <VariableModal
        prompt={variablePrompt}
        isOpen={Boolean(variablePrompt)}
        onClose={() => setVariablePrompt(null)}
        onCopied={(msg) => addToast(msg, "success")}
      />

      {/* Prompt Reading / Detail View Modal */}
      <PromptDetailModal
        prompt={detailPrompt}
        isOpen={Boolean(detailPrompt)}
        onClose={() => setDetailPrompt(null)}
        onEdit={(p) => {
          setEditorPrompt(p);
          setIsEditorOpen(true);
        }}
        onUseVariables={(p) => setVariablePrompt(p)}
        onToggleFavorite={handleToggleFavorite}
        onCopied={(msg) => addToast(msg, "success")}
      />

      {/* Prompt Create / Edit Modal */}
      <PromptEditorModal
        isOpen={isEditorOpen}
        initialPrompt={editorPrompt}
        onClose={() => {
          setIsEditorOpen(false);
          setEditorPrompt(null);
        }}
        onSave={handleSavePrompt}
      />

      {/* Backup Export / Import Modal */}
      <ExportImportModal
        isOpen={isExportImportOpen}
        onClose={() => setIsExportImportOpen(false)}
        prompts={prompts}
        onImport={handleImport}
        onResetSeed={handleResetSeed}
        onToast={addToast}
      />

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
