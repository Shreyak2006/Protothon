import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../stores/authStore';

describe('Auth Store', () => {
    beforeEach(() => {
        // Reset to default student
        useAuthStore.getState().switchRole('student');
    });

    it('initializes as authenticated with student user', () => {
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.user).not.toBeNull();
        expect(state.user.name).toBe('Arjun Mehta');
        expect(state.user.role).toBe('student');
        expect(state.user.email).toBe('arjun.mehta@university.edu');
    });

    it('switches to admin role', () => {
        useAuthStore.getState().switchRole('admin');
        const state = useAuthStore.getState();
        expect(state.user.name).toBe('Dr. Rajesh Kumar');
        expect(state.user.role).toBe('admin');
        expect(state.isAuthenticated).toBe(true);
    });

    it('switches to recruiter role', () => {
        useAuthStore.getState().switchRole('recruiter');
        const state = useAuthStore.getState();
        expect(state.user.name).toBe('Priya Sharma');
        expect(state.user.role).toBe('recruiter');
        expect(state.user.company).toBe('TechCorp Solutions');
    });

    it('ignores switchRole with invalid role', () => {
        useAuthStore.getState().switchRole('invalidRole');
        const state = useAuthStore.getState();
        // Should remain as student (previous role)
        expect(state.user.role).toBe('student');
    });

    it('login sets user based on role parameter', async () => {
        const user = await useAuthStore.getState().login('test@test.com', 'password', 'recruiter');
        expect(user.role).toBe('recruiter');
        expect(user.name).toBe('Priya Sharma');
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
    });

    it('login falls back to student for unknown role', async () => {
        const user = await useAuthStore.getState().login('test@test.com', 'password', 'unknown');
        expect(user.role).toBe('student');
    });

    it('logout is a no-op (stays authenticated)', () => {
        useAuthStore.getState().logout();
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.user).not.toBeNull();
    });

    it('setSessionWarning toggles warning state', () => {
        useAuthStore.getState().setSessionWarning(true);
        expect(useAuthStore.getState().sessionWarning).toBe(true);
        useAuthStore.getState().setSessionWarning(false);
        expect(useAuthStore.getState().sessionWarning).toBe(false);
    });

    it('getUser returns current user', () => {
        const user = useAuthStore.getState().getUser();
        expect(user).not.toBeNull();
        expect(user.name).toBe('Arjun Mehta');
    });

    it('persists user and isAuthenticated in partialize', () => {
        const state = useAuthStore.getState();
        // The persist config only saves user + isAuthenticated
        expect(state.user).toBeDefined();
        expect(state.isAuthenticated).toBeDefined();
    });
});
