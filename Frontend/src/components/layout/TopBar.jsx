import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { useMobile } from '../../hooks/useMobile';
import { Avatar } from '../ui/SharedUI';
import { getInitials } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import {
    Search, Bell, Menu, Sun, Moon, Monitor, LogOut, User, Settings, ChevronDown, Sparkles
} from 'lucide-react';

export default function TopBar() {
    const { sidebarCollapsed, setCommandPaletteOpen, setMobileMenuOpen, theme, setTheme } = useUIStore();
    const { user, logout } = useAuthStore();
    const unreadCount = useNotificationStore((s) => s.unreadCount);
    const isMobile = useMobile();
    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const themeIcon = theme === 'dark' ? <Moon className="w-4 h-4" /> : theme === 'light' ? <Sun className="w-4 h-4" /> : <Monitor className="w-4 h-4" />;
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';

    return (
        <header
            role="banner"
            className={cn(
                'fixed top-0 right-0 h-20 bg-card/60 backdrop-blur-xl border-b border-white/5 z-20 flex items-center gap-4 px-6 transition-all duration-500',
                !isMobile && (sidebarCollapsed ? 'left-24' : 'left-72'),
                isMobile && 'left-0'
            )}
        >
            {/* Mobile menu toggle */}
            {isMobile && (
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open navigation menu"
                    className="p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}

            {/* Neural Search Node */}
            <button
                onClick={() => setCommandPaletteOpen(true)}
                aria-label="Open command palette (Ctrl+K)"
                className="flex items-center gap-3 h-12 px-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-muted-foreground text-sm transition-all flex-1 max-w-md cursor-pointer group"
            >
                <Search className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                <span className="truncate font-medium">Initialize Neural Search...</span>
                <div className="hidden sm:inline-flex ml-auto items-center gap-0.5 rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">
                    ⌘K
                </div>
            </button>

            <div className="flex items-center gap-2 ml-auto">
                {/* Theme toggle */}
                <button
                    onClick={() => setTheme(nextTheme)}
                    aria-label={`Switch to ${nextTheme} theme`}
                    className="p-3 rounded-2xl hover:bg-white/5 transition-colors text-muted-foreground hover:text-white cursor-pointer"
                >
                    {themeIcon}
                </button>

                {/* Notifications Node */}
                <button
                    onClick={() => navigate('/dashboard/notifications')}
                    aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                    className="relative p-3 rounded-2xl hover:bg-white/5 transition-colors text-muted-foreground hover:text-white cursor-pointer"
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-primary/40 ring-2 ring-card animate-pulse">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>

                <div className="h-8 w-px bg-white/5 mx-2" />

                {/* Profile Identity */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        aria-expanded={profileOpen}
                        aria-haspopup="true"
                        aria-label="User profile menu"
                        className="flex items-center gap-3 p-2 pr-4 rounded-[1.25rem] hover:bg-white/5 transition-all cursor-pointer group"
                    >
                        <div className="relative">
                            <Avatar
                                fallback={user ? getInitials(user.name) : 'U'}
                                size="sm"
                                className="ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all shadow-xl"
                            />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-xs font-black text-white italic truncate leading-none mb-1">
                                {user?.name || 'User Identity'}
                            </p>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[8px] h-4 py-0 font-black uppercase tracking-tighter">
                                {user?.role || 'STUDENT'}
                            </Badge>
                        </div>
                        <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-300", profileOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-0 top-full mt-4 w-64 rounded-3xl border border-white/5 bg-card/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[100]"
                            >
                                <div className="px-6 py-5 border-b border-white/5 bg-white/5">
                                    <p className="text-sm font-black text-white italic">{user?.name}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 truncate">{user?.email}</p>
                                </div>
                                <div className="p-2">
                                    <button
                                        onClick={() => { navigate('/dashboard/profile'); setProfileOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/5 rounded-2xl transition-all cursor-pointer"
                                    >
                                        <User className="w-4 h-4 text-primary" /> My Identity
                                    </button>
                                    <button
                                        onClick={() => { navigate('/dashboard/settings'); setProfileOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/5 rounded-2xl transition-all cursor-pointer"
                                    >
                                        <Settings className="w-4 h-4 text-primary" /> Settings
                                    </button>
                                </div>
                                {/* Logout removed — dummy auth */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
