import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;
        const handler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const currentScroll = window.scrollY;
                    setProgress(totalHeight > 0 ? currentScroll / totalHeight : 0);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div
            className="scroll-progress fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] z-[200]"
            style={{
                transform: `scaleX(${progress})`,
                transformOrigin: "left",
                willChange: "transform"
            }}
        />
    );
}
