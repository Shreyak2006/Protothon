import React from 'react';
import { cn } from '../../lib/utils';

export function Progress({ value = 0, max = 100, className, indicatorClassName, size = 'default', showLabel = false }) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const heights = { sm: 'h-1.5', default: 'h-2.5', lg: 'h-4' };

    return (
        <div className="flex items-center gap-3 w-full">
            <div
                className={cn(
                    'relative w-full overflow-hidden rounded-full bg-[hsl(var(--secondary))]',
                    heights[size],
                    className
                )}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                <div
                    className={cn(
                        'h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500 ease-out',
                        indicatorClassName
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] tabular-nums min-w-[3ch]">
                    {Math.round(percentage)}%
                </span>
            )}
        </div>
    );
}

export function CircularProgress({
    value = 0,
    max = 100,
    size = 120,
    strokeWidth = 8,
    className,
    children,
    color,
}) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color || 'hsl(var(--primary))'}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {children || (
                    <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
                )}
            </div>
        </div>
    );
}
