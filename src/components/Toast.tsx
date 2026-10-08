import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:bottom-5 z-50 flex flex-col gap-2.5 sm:max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 sm:p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-200 animate-toast-slide ${
            toast.type === "success"
              ? "bg-[#0b1b17]/95 border-emerald-500/40 text-emerald-200 shadow-emerald-950/50"
              : toast.type === "error"
              ? "bg-[#1c0c12]/95 border-rose-500/40 text-rose-200 shadow-rose-950/50"
              : "bg-[#0f1424]/95 border-indigo-500/40 text-indigo-200 shadow-indigo-950/50"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {toast.type === "success" && (
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            )}
            {toast.type === "error" && (
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-rose-400" />
              </div>
            )}
            {toast.type === "info" && (
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-indigo-400" />
              </div>
            )}
            <span className="text-xs font-semibold leading-relaxed break-words">{toast.text}</span>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-2 -mr-1 rounded-xl opacity-70 hover:opacity-100 hover:bg-white/10 active:scale-90 transition-all ml-2 shrink-0 flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
