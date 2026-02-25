import { describe, it, expect } from 'vitest';
import { useAuthStore } from '../stores/authStore';

describe('Auth Store (Dummy)', () => {
    it('should initialize as already authenticated with student user', () => {
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.user).not.toBe(null);
        expect(state.user.name).toBe('Arjun Mehta');
        expect(state.user.role).toBe('student');
    });

    it('should allow role switching', () => {
        const store = useAuthStore.getState();
        store.switchRole('admin');

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.user.name).toBe('Dr. Rajesh Kumar');
        expect(state.user.role).toBe('admin');

        // Switch back to student for other tests
        store.switchRole('student');
    });

    it('logout should be a no-op', () => {
        const store = useAuthStore.getState();
        store.logout();

        const state = useAuthStore.getState();
        // Still authenticated after logout
        expect(state.isAuthenticated).toBe(true);
    });
});
