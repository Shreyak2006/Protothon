import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/Button';

describe('Button Component', () => {
    it('renders correctly with children', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeDefined();
    });

    it('handles click events', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click Me</Button>);
        fireEvent.click(screen.getByText('Click Me'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when the disabled prop is passed', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByText('Disabled');
        expect(button.disabled).toBe(true);
    });

    it('renders as a ghost variant when specified', () => {
        const { container } = render(<Button variant="ghost">Ghost</Button>);
        expect(container.firstChild.className).toContain('hover:bg-[hsl(var(--secondary))]');
    });
});
