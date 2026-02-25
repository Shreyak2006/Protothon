import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
    success: <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" />,
    error: <AlertCircle className="w-5 h-5 text-[hsl(var(--destructive))]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[hsl(var(--warning))]" />,
    info: <Info className="w-5 h-5 text-[hsl(var(--primary))]" />,
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef(new Map());

    // Clean up all timers on unmount
    useEffect(() => {
        return () => {
            timersRef.current.forEach((timerId) => clearTimeout(timerId));
            timersRef.current.clear();
        };
    }, []);

    const addToast = useCallback((toast) => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2);
        setToasts((prev) => [...prev, { id, ...toast }]);
        const timerId = setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
            timersRef.current.delete(id);
        }, toast.duration || 4000);
        timersRef.current.set(id, timerId);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const timerId = timersRef.current.get(id);
        if (timerId) { clearTimeout(timerId); timersRef.current.delete(id); }
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div role="status" aria-live="polite" className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            'pointer-events-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-lg animate-slide-in flex items-start gap-3',
                        )}
                    >
                        {icons[toast.type || 'info']}
                        <div className="flex-1 min-w-0">
                            {toast.title && (
                                <p className="text-sm font-semibold">{toast.title}</p>
                            )}
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            aria-label="Dismiss notification"
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
}
