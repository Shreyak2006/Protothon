import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => {
            const { variants, initial, animate, exit, whileInView, viewport, whileHover, transition: _t, ...rest } = props;
            return <div {...rest}>{children}</div>;
        },
        button: ({ children, ...props }) => {
            const { whileTap, transition: _t, ...rest } = props;
            return <button {...rest}>{children}</button>;
        },
    },
    AnimatePresence: ({ children }) => <>{children}</>,
    useSpring: vi.fn(() => ({ set: vi.fn(), on: vi.fn(() => vi.fn()) })),
    useTransform: vi.fn(),
}));

import DashboardPage from '../pages/student/DashboardPage';

function renderWithRouter(component) {
    return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe('DashboardPage', () => {
    it('renders the welcome heading with user name', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText(/Welcome, Arjun/i)).toBeInTheDocument();
    });

    it('renders all 4 stat cards', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Applied')).toBeInTheDocument();
        expect(screen.getByText('Shortlisted')).toBeInTheDocument();
        expect(screen.getByText('Interviews')).toBeInTheDocument();
        expect(screen.getByText('Offers')).toBeInTheDocument();
    });

    it('renders Placement Readiness section', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Placement Readiness')).toBeInTheDocument();
    });

    it('renders skill progress bars', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Technical Skills')).toBeInTheDocument();
        expect(screen.getByText('Resume Quality')).toBeInTheDocument();
        expect(screen.getByText('Interview Prep')).toBeInTheDocument();
    });

    it('renders upcoming drives section', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });

    it('renders AI insight card', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Placement potential')).toBeInTheDocument();
    });

    it('renders skill gaps section', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Core Skill Gaps')).toBeInTheDocument();
    });

    it('renders Global Leaderboard', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Global Leaderboard')).toBeInTheDocument();
    });

    it('renders Resume and Match AI buttons', () => {
        renderWithRouter(<DashboardPage />);
        expect(screen.getByText('Resume')).toBeInTheDocument();
        expect(screen.getByText('Match AI')).toBeInTheDocument();
    });
});
