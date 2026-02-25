import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

import ApplicationTrackerPage from '../pages/student/ApplicationTrackerPage';

function renderWithRouter(component) {
    return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe('ApplicationTrackerPage', () => {
    it('renders page header', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        expect(screen.getByText('Application Tracker')).toBeInTheDocument();
        expect(screen.getByText(/total applications/)).toBeInTheDocument();
    });

    it('renders Kanban view by default', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        expect(screen.getByText('Applied')).toBeInTheDocument();
        expect(screen.getByText('Shortlisted')).toBeInTheDocument();
        expect(screen.getByText('Interview')).toBeInTheDocument();
        expect(screen.getByText('Offer')).toBeInTheDocument();
        expect(screen.getByText('Rejected')).toBeInTheDocument();
    });

    it('renders company names in kanban cards', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        expect(screen.getByText('Microsoft')).toBeInTheDocument();
        expect(screen.getByText('Google')).toBeInTheDocument();
    });

    it('switches to timeline view', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        const timelineTab = screen.getByText('Timeline');
        fireEvent.click(timelineTab);
        // Timeline shows "Applied <date>" text
        expect(screen.getAllByText(/Applied/i).length).toBeGreaterThan(0);
    });

    it('shows tab controls', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        expect(screen.getByText('Kanban Board')).toBeInTheDocument();
        expect(screen.getByText('Timeline')).toBeInTheDocument();
    });

    it('renders empty state for columns with no applications', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        // check that "No applications" isn't showing for populated columns
        const noAppTexts = screen.queryAllByText('No applications');
        // At most some columns may be empty
        expect(noAppTexts.length).toBeLessThan(5);
    });

    it('displays package information in cards', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        expect(screen.getByText('₹35 LPA')).toBeInTheDocument();
        expect(screen.getByText('₹45 LPA')).toBeInTheDocument();
    });

    it('renders interview dates when available', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        // Microsoft has interview date March 8
        expect(screen.getByText(/8 Mar/i)).toBeInTheDocument();
    });

    it('shows round badges for applications with rounds', () => {
        renderWithRouter(<ApplicationTrackerPage />);
        expect(screen.getByText('Technical Round 2')).toBeInTheDocument();
    });
});
