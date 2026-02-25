import React from "react";
import { useTilt3D } from "../../hooks/landing/useTilt3D";
import { cn } from "../../lib/utils";

export default function TiltCard({ children, className, intensity = 10 }) {
    const { ref, style } = useTilt3D(intensity);

    return (
        <div
            ref={ref}
            style={style}
            className={cn("preserve-3d", className)}
        >
            {children}
        </div>
    );
}
