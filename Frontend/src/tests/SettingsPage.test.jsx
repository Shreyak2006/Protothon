import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '../components/ui/Toast';

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

import SettingsPage from '../pages/settings/SettingsPage';

function renderWithProviders(component) {
    return render(
        <BrowserRouter>
            <ToastProvider>
                {component}
            </ToastProvider>
        </BrowserRouter>
    );
}

describe('SettingsPage', () => {
    it('renders settings header', () => {
        renderWithProviders(<SettingsPage />);
        expect(screen.getByText('Manage your account and preferences')).toBeInTheDocument();
    });

    it('renders theme selection buttons', () => {
        renderWithProviders(<SettingsPage />);
        expect(screen.getByText('Light')).toBeInTheDocument();
        expect(screen.getByText('Dark')).toBeInTheDocument();
        expect(screen.getByText('System')).toBeInTheDocument();
    });

    it('renders notification toggles', () => {
        renderWithProviders(<SettingsPage />);
        expect(screen.getByText('Email Notifications')).toBeInTheDocument();
        expect(screen.getByText('Push Notifications')).toBeInTheDocument();
        expect(screen.getByText('SMS Alerts')).toBeInTheDocument();
    });

    it('renders security section with password fields', () => {
        renderWithProviders(<SettingsPage />);
        expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
        expect(screen.getByLabelText('New Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    });

    it('renders privacy toggles', () => {
        renderWithProviders(<SettingsPage />);
        expect(screen.getByText('Show profile to recruiters')).toBeInTheDocument();
        expect(screen.getByText('Allow AI-based recommendations')).toBeInTheDocument();
    });

    it('notification toggles have proper ARIA roles', () => {
        renderWithProviders(<SettingsPage />);
        const switches = screen.getAllByRole('switch');
        expect(switches.length).toBeGreaterThan(0);
    });

    it('renders save button', () => {
        renderWithProviders(<SettingsPage />);
        expect(screen.getByText('Save All Changes')).toBeInTheDocument();
    });

    it('toggles notification setting on click', () => {
        renderWithProviders(<SettingsPage />);
        const emailSwitch = screen.getByLabelText('Email Notifications');
        expect(emailSwitch.getAttribute('aria-checked')).toBe('true');
        fireEvent.click(emailSwitch);
        expect(emailSwitch.getAttribute('aria-checked')).toBe('false');
    });
});
