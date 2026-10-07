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
import { ToastContainer, ToastMessage } from "./components/Toast";
import { SEED_PROMPTS } from "./lib/seedData";
import { SearchX, Plus, RefreshCw } from "lucide-react";

export function App() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [storageMode, setStorageMode] = useState<StorageMode>("local");

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

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Navigation */}
      <Header
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
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
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
          /* Empty Search / Filter State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#0c101d] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-4 shadow-xl">
              <SearchX className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              No se encontraron prompts
            </h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              No hay resultados que coincidan con tus criterios de búsqueda o filtros activos.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Todas");
                  setSelectedModel("Todos");
                  setShowFavoritesOnly(false);
                  setSelectedTag(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl active:scale-95 transition"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => {
                  setEditorPrompt(null);
                  setIsEditorOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl active:scale-95 transition shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Crear nuevo</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-6 px-4 text-center text-xs text-slate-500 mt-auto bg-[#07090e]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">⚡ Prompts Célebres</span>
            <span>·</span>
            <span>Colección personal de @dannieldev</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Cloudflare Workers + D1</span>
            <span>·</span>
            <span>Atajo: Presiona <kbd className="font-mono bg-white/[0.08] px-1.5 py-0.5 rounded text-slate-300 border border-white/[0.06]">/</kbd> para buscar</span>
          </div>
        </div>
      </footer>

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
