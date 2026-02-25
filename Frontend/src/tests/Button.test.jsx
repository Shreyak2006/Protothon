import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/Button';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
    motion: {
        button: ({ children, ...props }) => {
            const { whileTap, transition: _transition, ...restProps } = props;
            return <button {...restProps}>{children}</button>;
        },
        div: ({ children, ...props }) => {
            const { whileInView, viewport, whileHover, variants, initial, animate, exit, transition: _transition, ...restProps } = props;
            return <div {...restProps}>{children}</div>;
        },
    },
    AnimatePresence: ({ children }) => <>{children}</>,
    useSpring: vi.fn(() => ({ set: vi.fn(), on: vi.fn(() => vi.fn()) })),
    useTransform: vi.fn(),
}));

describe('Button Component', () => {
    it('renders with children text', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('handles click events', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click</Button>);
        fireEvent.click(screen.getByText('Click'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is passed', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByText('Disabled');
        expect(button).toBeDisabled();
    });

    it('does not fire click when disabled', () => {
        const onClick = vi.fn();
        render(<Button disabled onClick={onClick}>Disabled</Button>);
        fireEvent.click(screen.getByText('Disabled'));
        expect(onClick).not.toHaveBeenCalled();
    });

    it('applies default variant classes', () => {
        const { container } = render(<Button>Default</Button>);
        const btn = container.firstChild;
        expect(btn.className).toContain('bg-[hsl(var(--primary))]');
    });

    it('applies destructive variant classes', () => {
        const { container } = render(<Button variant="destructive">Delete</Button>);
        const btn = container.firstChild;
        expect(btn.className).toContain('bg-[hsl(var(--destructive))]');
    });

    it('applies outline variant classes', () => {
        const { container } = render(<Button variant="outline">Outline</Button>);
        const btn = container.firstChild;
        expect(btn.className).toContain('border');
        expect(btn.className).toContain('bg-transparent');
    });

    it('applies small size classes', () => {
        const { container } = render(<Button size="sm">Small</Button>);
        const btn = container.firstChild;
        expect(btn.className).toContain('h-8');
    });

    it('applies large size classes', () => {
        const { container } = render(<Button size="lg">Large</Button>);
        const btn = container.firstChild;
        expect(btn.className).toContain('h-12');
    });

    it('applies custom className', () => {
        const { container } = render(<Button className="custom-class">Custom</Button>);
        const btn = container.firstChild;
        expect(btn.className).toContain('custom-class');
    });

    it('renders with focus-visible ring classes for accessibility', () => {
        const { container } = render(<Button>Focus</Button>);
        const btn = container.firstChild;
        expect(btn.className).toContain('focus-visible:ring-2');
    });
});
