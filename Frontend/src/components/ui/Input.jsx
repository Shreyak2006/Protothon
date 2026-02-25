import React from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Input({ className, type = 'text', icon, error, success, ...props }) {
    const inputClasses = cn(
        'flex h-12 w-full rounded-2xl border bg-card/50 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all border-white/5',
        icon && 'pl-10',
        error && 'border-rose-500/50 focus:ring-rose-500',
        success && 'border-emerald-500/50 focus:ring-emerald-500',
        className
    );

    return (
        <motion.div
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative group rounded-2xl"
        >
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10">
                    {icon}
                </div>
            )}

            <input
                type={type}
                className={inputClasses}
                {...props}
            />
        </motion.div>
    );
}

export function Textarea({ className, ...props }) {
    return (
        <textarea
            className={cn(
                'flex min-h-[120px] w-full rounded-2xl border border-white/5 bg-card/50 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none',
                className
            )}
            {...props}
        />
    );
}

export function Label({ className, children, required, ...props }) {
    return (
        <label
            className={cn(
                'text-[11px] font-black uppercase tracking-[0.2em] leading-none text-muted-foreground mb-2 block',
                className
            )}
            {...props}
        >
            {children}
            {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
    );
}

export function Select({ className, children, ...props }) {
    return (
        <div className="relative group">
            <select
                className={cn(
                    'flex h-12 w-full rounded-2xl border border-white/5 bg-card/50 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all cursor-pointer appearance-none',
                    className
                )}
                {...props}
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-primary transition-colors">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}
