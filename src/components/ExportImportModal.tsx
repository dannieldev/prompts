import React, { useState, useRef } from "react";
import {
  X,
  Download,
  Upload,
  RotateCcw,
  FileJson,
  Sparkles,
} from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";
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
        "¿Deseas restaurar la lista con los 16 Prompts Célebres iniciales? Tus prompts existentes no se perderán si tienen IDs distintos."
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0c101d] border border-white/[0.1] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-white/[0.08] flex items-center justify-between bg-[#101626]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Respaldar e Importar</h2>
                <Chip color="accent" variant="soft" size="sm">
                  {prompts.length} prompts
                </Chip>
              </div>
              <p className="text-xs text-slate-400">Exporta o sincroniza tu colección en formato JSON</p>
            </div>
          </div>

          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="rounded-xl text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Export card */}
          <div className="bg-[#07090e] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-inner">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Exportar Respaldo</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Descarga un archivo JSON con tus {prompts.length} prompts para guardarlo en local o moverlo de equipo.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportJson}
              className="rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 shrink-0"
            >
              <Download className="w-4 h-4 mr-1" />
              <span>Descargar</span>
            </Button>
          </div>

          {/* Import card */}
          <div className="bg-[#07090e] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-inner">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-violet-400" />
                <span>Importar JSON</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Sube un respaldo previo para combinar o restaurar tus prompts célebres.
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
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                isDisabled={importing}
                className="rounded-xl text-xs shrink-0"
              >
                <Upload className="w-4 h-4 mr-1" />
                <span>{importing ? "Cargando..." : "Subir Archivo"}</span>
              </Button>
            </div>
          </div>

          {/* Seed reset card */}
          <div className="bg-[#07090e] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-inner">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Restaurar Seeds Maestros</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Recarga los prompts semilla iniciales de desarrollo web, marketing y arquitectura.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestoreDefaults}
              isDisabled={resetting}
              className="rounded-xl text-xs text-slate-300 hover:text-white shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>{resetting ? "Cargando..." : "Cargar Seeds"}</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#101626] border-t border-white/[0.08] flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-xl text-xs text-slate-400 hover:text-white"
          >
            Cerrar <Kbd className="ml-1 text-[9px]">Esc</Kbd>
          </Button>
        </div>
      </div>
    </div>
  );
};
