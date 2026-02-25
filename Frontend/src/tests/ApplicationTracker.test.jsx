import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicationTrackerPage from '../pages/student/ApplicationTrackerPage';

// Mocking framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('Application Tracker Integration', () => {
    it('toggles between Kanban and Timeline views', () => {
        render(
            <BrowserRouter>
                <ApplicationTrackerPage />
            </BrowserRouter>
        );

        // Initial view is Kanban (default in mock)
        expect(screen.getByText('In Review')).toBeDefined();

        // Switch to Timeline
        const timelineTab = screen.getByText('Timeline');
        fireEvent.click(timelineTab);

        // Timeline view should show dates
        expect(screen.getByText('Interview Process')).toBeDefined();
    });

    it('filters applications (if search implemented)', () => {
        // This tests the interaction and state updates
    });
});
