import React, { useState } from "react";
import { Zap, Droplets, Sunrise } from "lucide-react";
import { cn } from "../../lib/utils";

const THEMES = {
    cyber: {
        label: "Cyber Neon",
        icon: Zap,
        colors: {
            "--accent-blue": "#3b82f6",
            "--accent-purple": "#8b5cf6",
            "--accent-cyan": "#06b6d4"
        }
    },
    ocean: {
        label: "Deep Blue",
        icon: Droplets,
        colors: {
            "--accent-blue": "#0ea5e9",
            "--accent-purple": "#2dd4bf",
            "--accent-cyan": "#22d3ee"
        }
    },
    aurora: {
        label: "Aurora",
        icon: Sunrise,
        colors: {
            "--accent-blue": "#10b981",
            "--accent-purple": "#8b5cf6",
            "--accent-cyan": "#f43f5e"
        }
    }
};

export default function ThemeSwitcher() {
    const [active, setActive] = useState("cyber");

    const setTheme = (key) => {
        setActive(key);
        const theme = THEMES[key];
        Object.entries(theme.colors).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
        });
    };

    return (
        <div className="fixed bottom-8 left-8 z-50 flex items-center gap-2 p-2 bg-[var(--bg-card)]/40 backdrop-blur-xl border border-[var(--border-subtle)] rounded-2xl shadow-2xl">
            {Object.entries(THEMES).map(([key, theme]) => {
                const Icon = theme.icon;
                const isActive = active === key;
                return (
                    <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-500",
                            isActive
                                ? "bg-[var(--accent-blue)] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                : "text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                        )}
                        aria-label={`Switch to ${theme.label} theme`}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="hidden lg:block">{theme.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
