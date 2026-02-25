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

import RecruiterPortalPage from '../pages/recruiter/RecruiterPortalPage';

function renderWithRouter(component) {
    return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe('RecruiterPortalPage', () => {
    it('renders recruiter portal header', () => {
        renderWithRouter(<RecruiterPortalPage />);
        expect(screen.getByText('Recruiter Portal')).toBeInTheDocument();
        expect(screen.getByText('Manage candidates and job postings')).toBeInTheDocument();
    });

    it('renders AI shortlist insight card', () => {
        renderWithRouter(<RecruiterPortalPage />);
        expect(screen.getByText('AI Shortlist Ready')).toBeInTheDocument();
    });

    it('renders candidates tab with table', () => {
        renderWithRouter(<RecruiterPortalPage />);
        expect(screen.getByText('Candidate')).toBeInTheDocument();
        expect(screen.getByText('Arjun Mehta')).toBeInTheDocument();
        expect(screen.getByText('Sneha Patel')).toBeInTheDocument();
    });

    it('search filters candidates', () => {
        renderWithRouter(<RecruiterPortalPage />);
        const searchInput = screen.getByPlaceholderText('Search candidates or skills...');
        fireEvent.change(searchInput, { target: { value: 'Sneha' } });
        expect(screen.getByText('Sneha Patel')).toBeInTheDocument();
        expect(screen.queryByText('Arjun Mehta')).not.toBeInTheDocument();
    });

    it('switches to job postings tab', () => {
        renderWithRouter(<RecruiterPortalPage />);
        const postingsTab = screen.getByText('Job Postings');
        fireEvent.click(postingsTab);
        expect(screen.getByText('SDE-1')).toBeInTheDocument();
        expect(screen.getByText('Data Engineer')).toBeInTheDocument();
    });

    it('displays candidate status badges', () => {
        renderWithRouter(<RecruiterPortalPage />);
        // Use getAllByText since status text appears in multiple places
        const shortlistedBadges = screen.getAllByText('shortlisted');
        expect(shortlistedBadges.length).toBeGreaterThan(0);
        const interviewBadges = screen.getAllByText('interview');
        expect(interviewBadges.length).toBeGreaterThan(0);
    });

    it('displays match scores', () => {
        renderWithRouter(<RecruiterPortalPage />);
        expect(screen.getByText('92%')).toBeInTheDocument(); // Arjun's match
        expect(screen.getByText('95%')).toBeInTheDocument(); // Sneha's match
    });

    it('renders filter and export buttons', () => {
        renderWithRouter(<RecruiterPortalPage />);
        expect(screen.getByText('Filters')).toBeInTheDocument();
        expect(screen.getByText('Export')).toBeInTheDocument();
    });
});
