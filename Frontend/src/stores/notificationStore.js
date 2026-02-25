import { create } from 'zustand';

const INITIAL_NOTIFICATIONS = [
    {
        id: '1',
        title: 'Google is visiting campus',
        message: 'Google will conduct on-campus recruitment on March 15. Apply before March 10.',
        type: 'drive',
        read: false,
        timestamp: '2026-02-25T09:00:00Z',
        actionUrl: '/job-matching',
    },
    {
        id: '2',
        title: 'Resume review completed',
        message: 'Your resume ATS score has been updated. Current score: 82/100.',
        type: 'ai',
        read: false,
        timestamp: '2026-02-24T16:30:00Z',
        actionUrl: '/profile',
    },
    {
        id: '3',
        title: 'New skill assessment available',
        message: 'A new Data Structures assessment has been published. Deadline: March 5.',
        type: 'assessment',
        read: false,
        timestamp: '2026-02-24T14:00:00Z',
        actionUrl: '/assessments',
    },
    {
        id: '4',
        title: 'Application shortlisted',
        message: 'You have been shortlisted for the Microsoft SDE-1 role. Interview on March 8.',
        type: 'application',
        read: true,
        timestamp: '2026-02-23T11:20:00Z',
        actionUrl: '/applications',
    },
    {
        id: '5',
        title: 'Policy update',
        message: 'Placement policy updated: Maximum 3 offers allowed per student for this season.',
        type: 'policy',
        read: true,
        timestamp: '2026-02-22T09:00:00Z',
        actionUrl: '/settings',
    },
    {
        id: '6',
        title: 'Skill gap detected',
        message: 'AI analysis suggests improving System Design skills for better match scores.',
        type: 'ai',
        read: false,
        timestamp: '2026-02-24T08:00:00Z',
        actionUrl: '/skills',
    },
];

export const useNotificationStore = create((set, get) => ({
    notifications: INITIAL_NOTIFICATIONS,
    unreadCount: INITIAL_NOTIFICATIONS.filter((n) => !n.read).length,
    filter: 'all',

    markAsRead: (id) =>
        set((s) => {
            const next = s.notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
            );
            return {
                notifications: next,
                unreadCount: next.filter((n) => !n.read).length,
            };
        }),

    markAllAsRead: () =>
        set((s) => {
            const next = s.notifications.map((n) => ({ ...n, read: true }));
            return {
                notifications: next,
                unreadCount: 0,
            };
        }),

    setFilter: (filter) => set({ filter }),

    getFiltered: () => {
        const { notifications, filter } = get();
        if (filter === 'all') return notifications;
        if (filter === 'unread') return notifications.filter((n) => !n.read);
        return notifications.filter((n) => n.type === filter);
    },

    addNotification: (notification) =>
        set((s) => {
            const next = [
                { ...notification, id: Date.now().toString(), timestamp: new Date().toISOString(), read: false },
                ...s.notifications,
            ];
            return {
                notifications: next,
                unreadCount: next.filter((n) => !n.read).length,
            };
        }),

    removeNotification: (id) =>
        set((s) => {
            const next = s.notifications.filter((n) => n.id !== id);
            return {
                notifications: next,
                unreadCount: next.filter((n) => !n.read).length,
            };
        }),
}));
