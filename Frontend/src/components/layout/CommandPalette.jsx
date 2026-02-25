import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';
import {
    Search, LayoutDashboard, User, Brain, Briefcase, ClipboardList,
    FileText, Building2, Shield, Scale, BarChart3, Bell, Settings,
    ArrowRight,
} from 'lucide-react';

const allCommands = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/', category: 'Navigation' },
    { id: 'profile', label: 'Profile & Resume', icon: <User className="w-4 h-4" />, path: '/profile', category: 'Navigation' },
    { id: 'skills', label: 'Skill Intelligence', icon: <Brain className="w-4 h-4" />, path: '/skills', category: 'Navigation' },
    { id: 'jobs', label: 'Job Matching', icon: <Briefcase className="w-4 h-4" />, path: '/job-matching', category: 'Navigation' },
    { id: 'applications', label: 'Application Tracker', icon: <ClipboardList className="w-4 h-4" />, path: '/applications', category: 'Navigation' },
    { id: 'assessments', label: 'Assessments', icon: <FileText className="w-4 h-4" />, path: '/assessments', category: 'Navigation' },
    { id: 'recruiter', label: 'Recruiter Portal', icon: <Building2 className="w-4 h-4" />, path: '/recruiter', category: 'Navigation' },
    { id: 'admin', label: 'Admin Dashboard', icon: <Shield className="w-4 h-4" />, path: '/admin', category: 'Navigation' },
    { id: 'policy', label: 'Policy Engine', icon: <Scale className="w-4 h-4" />, path: '/policy', category: 'Navigation' },
    { id: 'analytics', label: 'Analytics & Reports', icon: <BarChart3 className="w-4 h-4" />, path: '/analytics', category: 'Navigation' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, path: '/notifications', category: 'Navigation' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, path: '/settings', category: 'Navigation' },
];

export default function CommandPalette() {
    const { commandPaletteOpen, setCommandPaletteOpen, toggleCommandPalette } = useUIStore();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const filtered = allCommands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleCommandPalette();
            }
            if (e.key === 'Escape') setCommandPaletteOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [setCommandPaletteOpen, toggleCommandPalette]);

    useEffect(() => {
        if (commandPaletteOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [commandPaletteOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleSelect = (cmd) => {
        navigate(cmd.path);
        setCommandPaletteOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && filtered[selectedIndex]) {
            handleSelect(filtered[selectedIndex]);
        }
    };

    return (
        <AnimatePresence>
            {commandPaletteOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setCommandPaletteOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="relative w-full max-w-lg mx-4 bg-[hsl(var(--card))] rounded-2xl shadow-2xl border border-[hsl(var(--border))] overflow-hidden"
                    >
                        <div className="flex items-center gap-3 px-4 border-b border-[hsl(var(--border))]">
                            <Search className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search commands..."
                                className="flex-1 h-14 bg-transparent text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))] text-[hsl(var(--foreground))]"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-1.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                                ESC
                            </kbd>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto py-2">
                            {filtered.length === 0 ? (
                                <div className="px-4 py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
                                    No commands found
                                </div>
                            ) : (
                                filtered.map((cmd, i) => (
                                    <button
                                        key={cmd.id}
                                        onClick={() => handleSelect(cmd)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer ${i === selectedIndex
                                            ? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
                                            : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]'
                                            }`}
                                    >
                                        {cmd.icon}
                                        <span className="flex-1 text-left">{cmd.label}</span>
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="px-4 py-2.5 border-t border-[hsl(var(--border))] flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1 py-0.5 rounded border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[10px]">↑↓</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 rounded border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[10px]">↵</kbd>
                                Select
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
