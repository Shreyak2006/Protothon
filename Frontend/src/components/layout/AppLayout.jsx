import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useUIStore } from '../../stores/uiStore';
import { useMobile } from '../../hooks/useMobile';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import CommandPalette from './CommandPalette';
import ScrollProgress from '../shared/ScrollProgress';
import ErrorBoundary from '../shared/ErrorBoundary';

import AnimePageTransition from '../shared/AnimePageTransition';

import CinematicBackground from '../shared/CinematicBackground';

export default function AppLayout() {
    const { sidebarCollapsed } = useUIStore();
    const isMobile = useMobile();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] overflow-x-hidden">
            <CinematicBackground />
            <ScrollProgress />
            <Sidebar />
            <TopBar />
            <CommandPalette />

            <main
                className={cn(
                    'pt-[var(--topbar-height)] min-h-screen transition-all duration-300',
                    !isMobile && (sidebarCollapsed ? 'ml-[var(--sidebar-collapsed)]' : 'ml-[var(--sidebar-width)]'),
                )}
            >
                <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
                    <ErrorBoundary>
                        <AnimePageTransition key={location.pathname}>
                            <Outlet />
                        </AnimePageTransition>
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    );
}
