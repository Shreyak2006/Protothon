import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;
        const handler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const height = document.documentElement.scrollHeight - window.innerHeight;
                    setProgress(height > 0 ? (scrolled / height) * 100 : 0);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    if (progress < 1) return null;

    return (
        <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
            <div
                className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] transition-all duration-100"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
