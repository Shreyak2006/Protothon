import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
    default: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
    secondary: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
    destructive: 'bg-[hsl(var(--destructive)/0.15)] text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.3)]',
    success: 'bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] border-[hsl(var(--success)/0.3)]',
    warning: 'bg-[hsl(var(--warning)/0.15)] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.3)]',
    outline: 'border border-[hsl(var(--border))] text-[hsl(var(--foreground))]',
    ai: 'bg-gradient-to-r from-[hsl(var(--primary)/0.15)] to-[hsl(var(--accent)/0.15)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.2)]',
};

export function Badge({ className, variant = 'default', children, ...props }) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium transition-colors',
                badgeVariants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
