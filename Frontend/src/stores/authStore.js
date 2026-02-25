import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MOCK_USERS = {
    student: {
        id: 'stu-001',
        name: 'Arjun Mehta',
        email: 'arjun.mehta@university.edu',
        role: 'student',
        avatar: null,
        department: 'Computer Science',
        year: 4,
        cgpa: 8.7,
        registerNumber: 'CS2022001',
    },
    recruiter: {
        id: 'rec-001',
        name: 'Priya Sharma',
        email: 'priya@techcorp.com',
        role: 'recruiter',
        avatar: null,
        company: 'TechCorp Solutions',
        designation: 'HR Manager',
    },
    admin: {
        id: 'adm-001',
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@university.edu',
        role: 'admin',
        avatar: null,
        department: 'Placement Cell',
        designation: 'Placement Director',
    },
};

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // Dummy auth: always authenticated with student user
            user: MOCK_USERS.student,
            isAuthenticated: true,
            isLoading: false,
            sessionWarning: false,

            // Login is a no-op — already authenticated
            login: async (email, password, role = 'student') => {
                const user = MOCK_USERS[role] || MOCK_USERS.student;
                set({ user, isAuthenticated: true, isLoading: false });
                return user;
            },

            // Logout is a no-op — stay authenticated
            logout: () => {
                // no-op: dummy auth stays logged in
            },

            setSessionWarning: (show) => {
                set({ sessionWarning: show });
            },

            switchRole: (role) => {
                const user = MOCK_USERS[role];
                if (user) set({ user, isAuthenticated: true });
            },

            getUser: () => get().user,
        }),
        {
            name: 'placeai-auth',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
