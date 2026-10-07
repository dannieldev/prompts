import React, { useState, useRef } from "react";
import {
  X,
  Download,
  Upload,
  RotateCcw,
  FileJson,
} from "lucide-react";
import { PromptItem } from "../types";

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: PromptItem[];
  onImport: (items: PromptItem[]) => Promise<number>;
  onResetSeed: () => Promise<void>;
  onToast: (msg: string, type: "success" | "error") => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  prompts,
  onImport,
  onResetSeed,
  onToast,
}) => {
  const [importing, setImporting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExportJson = () => {
    try {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify(
            {
              version: "1.0",
              exported_at: new Date().toISOString(),
              prompts,
            },
            null,
            2
          )
        );
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `dannieldev-prompts-backup-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      onToast("Respaldo descargado exitosamente", "success");
    } catch (e: any) {
      onToast("Error al exportar: " + e.message, "error");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const items = Array.isArray(parsed) ? parsed : parsed.prompts;

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("El archivo no contiene una lista válida de prompts.");
      }

      const count = await onImport(items);
      onToast(`Se importaron ${count} prompts con éxito`, "success");
      onClose();
    } catch (err: any) {
      onToast("Error al importar archivo: " + err.message, "error");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRestoreDefaults = async () => {
    if (
      !window.confirm(
        "¿Deseas restaurar la lista con los 10 Prompts Célebres iniciales? Tus prompts existentes no se perderán si tienen IDs distintos."
      )
    ) {
      return;
    }

    setResetting(true);
    try {
      await onResetSeed();
      onToast("Prompts Célebres iniciales cargados con éxito", "success");
      onClose();
    } catch (e: any) {
      onToast("Error al restaurar: " + e.message, "error");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0c101d] border border-white/[0.1] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#1f2d47] flex items-center justify-between bg-[#131c2e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Respaldar e Importar</h2>
              <p className="text-xs text-gray-400">Exporta tu colección en formato JSON estándar</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Export card */}
          <div className="bg-[#0b0f17] border border-[#1e2a42] rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Exportar Respaldo</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Descarga un archivo con tus {prompts.length} prompts para guardarlo en tu Mac o sincronizar.
              </p>
            </div>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Descargar</span>
            </button>
          </div>

          {/* Import card */}
          <div className="bg-[#0b0f17] border border-[#1e2a42] rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Importar JSON</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Sube un respaldo previo para combinar o restaurar tus prompts.
              </p>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1c273d] hover:bg-[#253554] border border-[#293d63] text-gray-200 rounded-xl text-xs font-medium transition shrink-0"
              >
                <Upload className="w-4 h-4" />
                <span>{importing ? "Cargando..." : "Subir Archivo"}</span>
              </button>
            </div>
          </div>

          {/* Seed reset card */}
          <div className="bg-[#0b0f17] border border-[#1e2a42] rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Cargar Prompts Célebres</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Restablece los 10 prompts iniciales recomendados para desarrollo, marketing y arquitectura.
              </p>
            </div>
            <button
              onClick={handleRestoreDefaults}
              disabled={resetting}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-medium transition shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{resetting ? "Cargando..." : "Cargar Seeds"}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#131c2e] border-t border-[#1f2d47] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-xl transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
