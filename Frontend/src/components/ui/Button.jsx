import React, { useRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const variants = {
    default: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm hover:bg-[hsl(var(--primary)/0.9)]',
    destructive: 'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive)/0.9)]',
    outline: 'border border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
    secondary: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.8)]',
    ghost: 'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
    link: 'text-[hsl(var(--primary))] underline-offset-4 hover:underline',
    success: 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success)/0.9)]',
};

const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-xs rounded-md',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10',
};

export function Button({
    className,
    variant = 'default',
    size = 'default',
    children,
    disabled,
    onClick,
    ...props
}) {
    return (
        <motion.button
            whileTap={!disabled ? { scale: 0.96, rotate: -1 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={onClick}
            className={cn(
                'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </motion.button>
    );
}
