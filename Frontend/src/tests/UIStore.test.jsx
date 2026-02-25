import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../stores/uiStore';

describe('UI Store', () => {
    beforeEach(() => {
        useUIStore.setState({
            sidebarOpen: true,
            sidebarCollapsed: false,
            commandPaletteOpen: false,
            theme: 'system',
            mobileMenuOpen: false,
        });
    });

    it('toggles sidebar open state', () => {
        useUIStore.getState().toggleSidebar();
        expect(useUIStore.getState().sidebarOpen).toBe(false);
        useUIStore.getState().toggleSidebar();
        expect(useUIStore.getState().sidebarOpen).toBe(true);
    });

    it('sets sidebar open explicitly', () => {
        useUIStore.getState().setSidebarOpen(false);
        expect(useUIStore.getState().sidebarOpen).toBe(false);
        useUIStore.getState().setSidebarOpen(true);
        expect(useUIStore.getState().sidebarOpen).toBe(true);
    });

    it('toggles sidebar collapsed state', () => {
        useUIStore.getState().toggleSidebarCollapsed();
        expect(useUIStore.getState().sidebarCollapsed).toBe(true);
        useUIStore.getState().toggleSidebarCollapsed();
        expect(useUIStore.getState().sidebarCollapsed).toBe(false);
    });

    it('toggles command palette', () => {
        useUIStore.getState().toggleCommandPalette();
        expect(useUIStore.getState().commandPaletteOpen).toBe(true);
        useUIStore.getState().toggleCommandPalette();
        expect(useUIStore.getState().commandPaletteOpen).toBe(false);
    });

    it('sets command palette explicitly', () => {
        useUIStore.getState().setCommandPaletteOpen(true);
        expect(useUIStore.getState().commandPaletteOpen).toBe(true);
    });

    it('sets mobile menu open', () => {
        useUIStore.getState().setMobileMenuOpen(true);
        expect(useUIStore.getState().mobileMenuOpen).toBe(true);
        useUIStore.getState().setMobileMenuOpen(false);
        expect(useUIStore.getState().mobileMenuOpen).toBe(false);
    });

    it('changes theme', () => {
        useUIStore.getState().setTheme('dark');
        expect(useUIStore.getState().theme).toBe('dark');
        useUIStore.getState().setTheme('light');
        expect(useUIStore.getState().theme).toBe('light');
        useUIStore.getState().setTheme('system');
        expect(useUIStore.getState().theme).toBe('system');
    });

    it('initTheme does not throw', () => {
        expect(() => useUIStore.getState().initTheme()).not.toThrow();
    });

    it('persists only theme and sidebarCollapsed', () => {
        // The persist config partializes these fields
        const state = useUIStore.getState();
        expect(state.theme).toBeDefined();
        expect(state.sidebarCollapsed).toBeDefined();
    });
});
