import React from 'react';
import { cn } from '../../lib/utils';

export function Avatar({ src, alt, fallback, size = 'default', className }) {
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        default: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
    };

    if (src) {
        return (
            <img
                src={src}
                alt={alt || 'Avatar'}
                className={cn(
                    'rounded-full object-cover ring-2 ring-[hsl(var(--background))]',
                    sizes[size],
                    className
                )}
            />
        );
    }

    return (
        <div
            className={cn(
                'rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center font-semibold text-white ring-2 ring-[hsl(var(--background))]',
                sizes[size],
                className
            )}
            aria-label={alt || fallback}
        >
            {fallback}
        </div>
    );
}

export function Separator({ className, orientation = 'horizontal', ...props }) {
    return (
        <div
            role="separator"
            className={cn(
                'shrink-0 bg-[hsl(var(--border))]',
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
                className
            )}
            {...props}
        />
    );
}

export function Tabs({ tabs, activeTab, onTabChange, className }) {
    return (
        <div role="tablist" className={cn('flex gap-1 border-b border-[hsl(var(--border))]', className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    role="tab"
                    aria-selected={activeTab === tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={cn(
                        'px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-[1px] cursor-pointer',
                        activeTab === tab.value
                            ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                            : 'border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--border))]'
                    )}
                >
                    {tab.icon && <span className="mr-2">{tab.icon}</span>}
                    {tab.label}
                    {tab.count !== undefined && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-[hsl(var(--secondary))]">
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}

export function EmptyState({ icon, title, description, action, className }) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
            {icon && (
                <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--secondary))] flex items-center justify-center mb-4 text-[hsl(var(--muted-foreground))]">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-sm mb-4">{description}</p>
            {action}
        </div>
    );
}

export function Tooltip({ children, content, className }) {
    return (
        <div className="group relative inline-block">
            {children}
            <div
                className={cn(
                    'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-[hsl(var(--foreground))] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none',
                    className
                )}
            >
                {content}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[hsl(var(--foreground))]" />
            </div>
        </div>
    );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', variant = 'destructive' }) {
    const dialogRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab') {
                const focusableNodes = dialogRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (!focusableNodes || focusableNodes.length === 0) return;
                const first = focusableNodes[0];
                const last = focusableNodes[focusableNodes.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        dialogRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                tabIndex={-1}
                className="relative bg-[hsl(var(--card))] rounded-2xl shadow-2xl border border-[hsl(var(--border))] p-6 max-w-md w-full mx-4 animate-scale-in outline-none"
            >
                <h3 id="confirm-dialog-title" className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">{message}</p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={cn(
                            'px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors cursor-pointer',
                            variant === 'destructive' ? 'bg-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.9)]' : 'bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)]'
                        )}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
