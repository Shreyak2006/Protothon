import React from 'react';
import { cn } from '../../lib/utils';

export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn('animate-shimmer rounded-lg', className)}
            {...props}
        />
    );
}

export function SkeletonCard() {
    return (
        <div className="rounded-xl border border-[hsl(var(--border))] p-6 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-3 w-[40%]" />
                </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5 }) {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
            ))}
        </div>
    );
}

export function SkeletonChart() {
    return (
        <div className="rounded-xl border border-[hsl(var(--border))] p-6 space-y-4">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
    );
}
