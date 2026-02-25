import React from 'react';
import { Sparkles, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

const aiIcons = {
    insight: Sparkles,
    trend: TrendingUp,
    suggestion: Lightbulb,
    target: Target,
};

export default function AIInsightCard({
    type = 'insight',
    title,
    children,
    confidence,
    className,
}) {
    const Icon = aiIcons[type] || Sparkles;

    return (
        <div
            className={cn(
                'relative rounded-xl border border-[hsl(var(--primary)/0.2)] bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-[hsl(var(--accent)/0.05)] p-4 overflow-hidden',
                className
            )}
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[hsl(var(--primary)/0.05)] rounded-full blur-2xl -translate-y-8 translate-x-8" />
            <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[hsl(var(--primary)/0.15)] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[hsl(var(--primary))]" />
                    </div>
                    <span className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wider">
                        AI {type}
                    </span>
                    {confidence !== undefined && (
                        <span className="ml-auto text-[10px] font-medium text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] px-2 py-0.5 rounded-full">
                            {confidence}% confident
                        </span>
                    )}
                </div>
                {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
                <div className="text-sm text-[hsl(var(--muted-foreground))]">{children}</div>
            </div>
        </div>
    );
}
