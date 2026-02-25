import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else if (theme === 'light') {
        root.classList.remove('dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
    }
}

export const useUIStore = create(
    persist(
        (set, get) => ({
            sidebarOpen: true,
            sidebarCollapsed: false,
            commandPaletteOpen: false,
            theme: 'system',
            mobileMenuOpen: false,

            toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),
            toggleSidebarCollapsed: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
            setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
            toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
            setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

            setTheme: (theme) => {
                set({ theme });
                applyTheme(theme);
            },

            initTheme: () => {
                applyTheme(get().theme);
            },
        }),
        {
            name: 'placeai-ui',
            partialize: (state) => ({
                theme: state.theme,
                sidebarCollapsed: state.sidebarCollapsed,
            }),
        }
    )
);
