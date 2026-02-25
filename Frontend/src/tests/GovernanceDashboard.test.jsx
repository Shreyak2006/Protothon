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
}));

// Mock recharts to avoid SVG rendering issues in jsdom
vi.mock('recharts', () => ({
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div />,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    XAxis: () => <div />,
    YAxis: () => <div />,
    Tooltip: () => <div />,
    CartesianGrid: () => <div />,
}));

import GovernanceDashboardPage from '../pages/admin/GovernanceDashboardPage';

function renderWithRouter(component) {
    return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe('GovernanceDashboardPage', () => {
    it('renders admin governance header', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('Admin Governance')).toBeInTheDocument();
        expect(screen.getByText('Placement oversight and management')).toBeInTheDocument();
    });

    it('renders overview stat cards', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('Total Students')).toBeInTheDocument();
        expect(screen.getByText('Placed')).toBeInTheDocument();
        expect(screen.getByText('Placement Rate')).toBeInTheDocument();
        expect(screen.getByText('Avg Package')).toBeInTheDocument();
    });

    it('renders correct stat values', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('1,247')).toBeInTheDocument();
        expect(screen.getByText('842')).toBeInTheDocument();
        expect(screen.getByText('67.5%')).toBeInTheDocument();
    });

    it('renders department placement rate chart', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('Department Placement Rate')).toBeInTheDocument();
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });

    it('renders eligibility monitor', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('Eligibility Monitor')).toBeInTheDocument();
        expect(screen.getByText('CSE')).toBeInTheDocument();
        expect(screen.getByText('IT')).toBeInTheDocument();
    });

    it('renders company management table', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('Company Management')).toBeInTheDocument();
        expect(screen.getByText('Google')).toBeInTheDocument();
        expect(screen.getByText('Microsoft')).toBeInTheDocument();
    });

    it('renders action buttons', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('Policy Config')).toBeInTheDocument();
        expect(screen.getByText('Analytics')).toBeInTheDocument();
    });

    it('renders add company button', () => {
        renderWithRouter(<GovernanceDashboardPage />);
        expect(screen.getByText('+ Add Company')).toBeInTheDocument();
    });
});
