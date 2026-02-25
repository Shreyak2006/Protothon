import { describe, it, expect, beforeEach } from 'vitest';
import { useNotificationStore } from '../stores/notificationStore';

describe('Notification Store', () => {
    beforeEach(() => {
        // Reset store to initial state by re-importing or using setState
        useNotificationStore.setState({
            notifications: [
                { id: '1', title: 'Test 1', message: 'Msg 1', type: 'drive', read: false, timestamp: '2026-02-25T09:00:00Z' },
                { id: '2', title: 'Test 2', message: 'Msg 2', type: 'ai', read: false, timestamp: '2026-02-24T16:30:00Z' },
                { id: '3', title: 'Test 3', message: 'Msg 3', type: 'assessment', read: true, timestamp: '2026-02-24T14:00:00Z' },
            ],
            unreadCount: 2,
            filter: 'all',
        });
    });

    it('initializes with correct unread count', () => {
        const { unreadCount } = useNotificationStore.getState();
        expect(unreadCount).toBe(2);
    });

    it('marks a single notification as read', () => {
        useNotificationStore.getState().markAsRead('1');
        const state = useNotificationStore.getState();
        const n = state.notifications.find((n) => n.id === '1');
        expect(n.read).toBe(true);
        expect(state.unreadCount).toBe(1);
    });

    it('marks all notifications as read', () => {
        useNotificationStore.getState().markAllAsRead();
        const state = useNotificationStore.getState();
        expect(state.unreadCount).toBe(0);
        expect(state.notifications.every((n) => n.read)).toBe(true);
    });

    it('adds a notification', () => {
        useNotificationStore.getState().addNotification({
            title: 'New Alert',
            message: 'Something happened',
            type: 'policy',
        });
        const state = useNotificationStore.getState();
        expect(state.notifications.length).toBe(4);
        expect(state.notifications[0].title).toBe('New Alert');
        expect(state.notifications[0].read).toBe(false);
        expect(state.unreadCount).toBe(3);
    });

    it('removes a notification', () => {
        useNotificationStore.getState().removeNotification('1');
        const state = useNotificationStore.getState();
        expect(state.notifications.length).toBe(2);
        expect(state.notifications.find((n) => n.id === '1')).toBeUndefined();
        expect(state.unreadCount).toBe(1);
    });

    it('filters by type', () => {
        useNotificationStore.getState().setFilter('drive');
        const filtered = useNotificationStore.getState().getFiltered();
        expect(filtered.length).toBe(1);
        expect(filtered[0].type).toBe('drive');
    });

    it('filters unread only', () => {
        useNotificationStore.getState().setFilter('unread');
        const filtered = useNotificationStore.getState().getFiltered();
        expect(filtered.length).toBe(2);
        expect(filtered.every((n) => !n.read)).toBe(true);
    });

    it('returns all when filter is "all"', () => {
        useNotificationStore.getState().setFilter('all');
        const filtered = useNotificationStore.getState().getFiltered();
        expect(filtered.length).toBe(3);
    });

    it('handles marking non-existent notification as read gracefully', () => {
        useNotificationStore.getState().markAsRead('nonexistent');
        const state = useNotificationStore.getState();
        expect(state.unreadCount).toBe(2); // unchanged
    });

    it('handles removing non-existent notification gracefully', () => {
        useNotificationStore.getState().removeNotification('nonexistent');
        const state = useNotificationStore.getState();
        expect(state.notifications.length).toBe(3); // unchanged
    });
});
