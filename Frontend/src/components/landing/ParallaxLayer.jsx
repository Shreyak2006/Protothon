import React from "react";
import { useParallax } from "../../hooks/landing/useParallax";

export default function ParallaxLayer({ children, speed, className, style }) {
    const offset = useParallax(speed);

    return (
        <div
            className={className}
            style={{
                ...style,
                transform: `translate3d(0, ${offset}px, 0)`,
                willChange: "transform",
            }}
        >
            {children}
        </div>
    );
}
