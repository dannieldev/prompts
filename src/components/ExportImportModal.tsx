import { useDialogFocus } from "../hooks/useDialogFocus";
import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Download,
  Upload,
  FileJson,
} from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";
import { PromptItem } from "../types";

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: PromptItem[];
  onImport: (items: PromptItem[]) => Promise<number>;
  onToast: (msg: string, type: "success" | "error") => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  prompts,
  onImport,
  onToast,
}) => {
  const dialogRef = useDialogFocus(isOpen);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
        `prompts-celebres-backup-${new Date().toISOString().slice(0, 10)}.json`
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
      onToast(
        count > 0
          ? `Se importaron ${count} prompts con éxito`
          : "Respaldo aplicado (el catálogo base se mantiene intacto)",
        "success"
      );
      onClose();
    } catch (err: any) {
      onToast("Error al importar archivo: " + err.message, "error");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="dialog-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/30">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Respaldar e importar" tabIndex={-1} className="app-dialog relative w-full max-w-lg bg-surface border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4.5 border-b border-border flex items-center justify-between gap-3 bg-surface-secondary/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <FileJson className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-foreground">Respaldar e Importar</h2>
                <Chip color="accent" variant="soft" size="sm">
                  {prompts.length} prompts
                </Chip>
              </div>
              <p className="text-xs sm:text-sm text-muted">Respalda tu colección local en formato JSON</p>
            </div>
          </div>

          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="rounded-xl text-muted hover:text-foreground shrink-0 min-h-[44px] min-w-[44px]"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <p className="text-xs sm:text-sm text-muted">Los prompts base del catálogo se mantienen siempre intactos. Tus respaldos e importaciones locales se guardan únicamente en este navegador.</p>
          {/* Export card */}
          <div className="bg-surface-secondary/60 border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Download className="w-4 h-4 text-accent shrink-0" />
                <span>Exportar Respaldo</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Descarga un archivo JSON con tus {prompts.length} prompts para guardarlo en local o moverlo de equipo.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportJson}
              className="rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-accent/25 shrink-0 self-start sm:self-auto"
            >
              <Download className="w-4 h-4 mr-1 shrink-0" />
              <span>Descargar</span>
            </Button>
          </div>

          {/* Import card */}
          <div className="bg-surface-secondary/60 border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-accent shrink-0" />
                <span>Importar JSON</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Abre un respaldo para agregar tus prompts propios en este navegador sin alterar la base por defecto.
              </p>
            </div>
            <div className="self-start sm:self-auto">
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
                className="rounded-xl text-xs sm:text-sm shrink-0"
              >
                <Upload className="w-4 h-4 mr-1 shrink-0" />
                <span>{importing ? "Cargando..." : "Abrir archivo"}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-surface-secondary/50 border-t border-border flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-xl text-xs sm:text-sm text-muted hover:text-foreground"
          >
            Cerrar <Kbd className="ml-1 text-xs hidden sm:inline-flex">Esc</Kbd>
          </Button>
        </div>
      </div>
    </div>
  );
};
