import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { useMobile } from '../../hooks/useMobile';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, User, Brain, Briefcase, ClipboardList,
    FileText, Building2, Shield, Scale, BarChart3, Bell, Settings,
    ChevronLeft, ChevronRight, X, Sparkles,
} from 'lucide-react';

const studentNav = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Profile & Resume', path: '/profile', icon: User },
    { label: 'Skill Intelligence', path: '/skills', icon: Brain },
    { label: 'Job Matching', path: '/job-matching', icon: Briefcase },
    { label: 'Applications', path: '/applications', icon: ClipboardList },
    { label: 'Assessments', path: '/assessments', icon: FileText },
];

const recruiterNav = [
    { label: 'Recruiter Portal', path: '/recruiter', icon: Building2 },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const adminNav = [
    { label: 'Governance', path: '/admin', icon: Shield },
    { label: 'Policy Engine', path: '/policy', icon: Scale },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const commonNav = [
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
    const { sidebarCollapsed, toggleSidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
    const { user } = useAuthStore();
    const isMobile = useMobile();
    const location = useLocation();
    const sidebarRef = useRef(null);
    const overlayRef = useRef(null);

    const role = user?.role || 'student';
    const mainNav = role === 'admin' ? adminNav : role === 'recruiter' ? recruiterNav : studentNav;

    // Handle Mobile Transitions manually with Anime
    useEffect(() => {
        if (isMobile) {
            if (mobileMenuOpen) {
                anime({
                    targets: overlayRef.current,
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutQuad',
                });
                anime({
                    targets: sidebarRef.current,
                    translateX: [-280, 0],
                    duration: 600,
                    easing: 'easeOutElastic(1, .8)',
                });
            } else {
                // When closing, we might need a state to delay the unmount 
                // but let's assume the state change is handled by UIStore
            }
        }
    }, [mobileMenuOpen, isMobile]);

    const handleHover = (e, isActive) => {
        if (isActive) return;
        anime({
            targets: e.currentTarget,
            translateX: 5,
            duration: 300,
            easing: 'easeOutQuad'
        });
    };

    const handleHoverOut = (e, isActive) => {
        if (isActive) return;
        anime({
            targets: e.currentTarget,
            translateX: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    };

    const renderLink = (item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
            <NavLink
                key={item.path}
                to={item.path}
                onMouseEnter={(e) => handleHover(e, isActive)}
                onMouseLeave={(e) => handleHoverOut(e, isActive)}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={cn(
                    'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                    isActive
                        ? 'bg-primary/10 text-primary border border-primary/10'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5',
                    sidebarCollapsed && !isMobile && 'justify-center px-2'
                )}
            >
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                )}
                <Icon className={cn('w-5 h-5 shrink-0', isActive && 'text-primary')} />
                {(!sidebarCollapsed || isMobile) && (
                    <span className="truncate font-bold italic tracking-tight">{item.label}</span>
                )}
            </NavLink>
        );
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className={cn(
                'flex items-center gap-4 px-4 h-20 border-b border-white/5 shrink-0',
                sidebarCollapsed && !isMobile && 'justify-center px-2'
            )}>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                {(!sidebarCollapsed || isMobile) && (
                    <div className="min-w-0">
                        <h1 className="text-xl font-black italic tracking-tighter text-white leading-none">PlaceAI</h1>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">V.4.2.0 Core</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-6">
                <div>
                    {(!sidebarCollapsed || isMobile) && (
                        <p className="px-3 mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
                            Neural Sectors
                        </p>
                    )}
                    <div className="space-y-1">
                        {mainNav.map(renderLink)}
                    </div>
                </div>

                <div className="h-px bg-white/5 mx-2" />

                <div>
                    {(!sidebarCollapsed || isMobile) && (
                        <p className="px-3 mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
                            System Node
                        </p>
                    )}
                    <div className="space-y-1">
                        {commonNav.map(renderLink)}
                    </div>
                </div>
            </nav>

            {/* User Profile Quick View */}
            {(!sidebarCollapsed || isMobile) && (
                <div className="p-4 mx-4 mb-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">
                            {user?.name?.[0] || 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-black text-white italic truncate">{user?.name || 'Arjun Mehta'}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase truncate">IIT Delhi • S-Rank</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Collapse Toggle */}
            {!isMobile && (
                <div className="px-4 py-4 border-t border-white/5 shrink-0">
                    <button
                        onClick={toggleSidebarCollapsed}
                        className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                        {!sidebarCollapsed && <span>Matrix Collapse</span>}
                    </button>
                </div>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-[100]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute left-0 top-0 bottom-0 w-[280px] bg-card border-r border-white/5 z-10 shadow-2xl"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>
        );
    }

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 bottom-0 bg-card border-r border-white/5 z-30 transition-all duration-500 hidden md:block',
                sidebarCollapsed ? 'w-24' : 'w-72'
            )}
        >
            {sidebarContent}
        </aside>
    );
}
