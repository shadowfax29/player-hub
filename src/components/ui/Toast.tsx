"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  notify: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ notify: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, type: ToastType = "error") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    error: <AlertCircle size={16} className="text-red-400 shrink-0" />,
    success: <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />,
    info: <Info size={16} className="text-cyan-400 shrink-0" />,
  };

  const borders = {
    error: "border-red-500/30",
    success: "border-emerald-500/30",
    info: "border-cyan-500/30",
  };

  const bgColors = {
    error: "bg-red-500/10",
    success: "bg-emerald-500/10",
    info: "bg-cyan-500/10",
  };

  return (
    <div className={`pointer-events-auto flex items-start gap-3 ${bgColors[toast.type]} border ${borders[toast.type]} rounded-xl px-4 py-3 max-w-sm shadow-2xl backdrop-blur-xl animate-[slideIn_0.2s_ease-out]`}>
      {icons[toast.type]}
      <p className="text-xs text-white leading-relaxed flex-1">{toast.message}</p>
      <button onClick={onDismiss} className="text-[#6b7280] hover:text-white transition-colors shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}
