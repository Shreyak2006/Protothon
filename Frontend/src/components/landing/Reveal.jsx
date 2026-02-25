import React from "react";
import { useIntersectionReveal } from "../../hooks/landing/useIntersectionReveal";
import { cn } from "../../lib/utils";

export default function Reveal({
    children,
    className,
    variant = "fade-up",
    delay = 0,
    threshold = 0.15
}) {
    const { ref, isVisible } = useIntersectionReveal({ threshold });

    return (
        <div
            ref={ref}
            className={cn(
                "reveal-base",
                `reveal-${variant}`,
                delay > 0 && `stagger-${delay}`,
                isVisible && "reveal-visible",
                className
            )}
        >
            {children}
        </div>
    );
}
