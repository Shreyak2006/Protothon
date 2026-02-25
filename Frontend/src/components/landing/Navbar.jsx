import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "AI Skills", href: "#skills" },
    { label: "Policy", href: "#policy" },
    { label: "Roles", href: "#roles" },
    { label: "Analytics", href: "#analytics" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Background blur threshold
            setScrolled(currentScrollY > 60);

            // Hide on scroll down, show on scroll up
            if (currentScrollY > 400) {
                if (currentScrollY > lastScrollY) {
                    setVisible(false);
                    setMobileOpen(false);
                } else {
                    setVisible(true);
                }
            } else {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleClick = (href) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 will-change-transform",
                scrolled
                    ? "py-3 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-2xl"
                    : "py-6 bg-transparent border-transparent",
                visible ? "translate-y-0" : "-translate-y-full"
            )}
        >
            <div className="section-container flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("#hero");
                    }}
                    className="flex items-center gap-2.5 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">
                        Place<span className="l-l-gradient-text">AI</span>
                    </span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(link.href);
                            }}
                            className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/login" className="l-l-btn-outline py-2 px-5 text-[13px]">
                        <span>Log In</span>
                    </Link>
                    <Link to="/signup" className="l-l-btn-primary py-2.5 px-5 text-[13px]">
                        <span>Get Started</span>
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu (Native CSS transition) */}
            <div
                className={cn(
                    "absolute left-0 right-0 top-full bg-[rgba(6,8,15,0.97)] backdrop-blur-xl border-b border-[var(--border-subtle)] p-6 md:hidden transition-all duration-300",
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                )}
            >
                <div className="space-y-1 mb-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(link.href);
                            }}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--test-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)] transition-all"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex gap-3">
                    <Link to="/login" className="l-l-btn-outline flex-1 py-2.5 text-sm text-center">
                        <span>Log In</span>
                    </Link>
                    <Link to="/signup" className="l-l-btn-primary flex-1 py-2.5 text-sm text-center">
                        <span>Get Started</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
