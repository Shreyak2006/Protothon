import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/SharedUI';
import { applications } from '../../data/mockData';
import { ClipboardList, Calendar, Building2, ChevronRight, GripVertical } from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const statusConfig = {
    applied: { label: 'Applied', color: 'secondary', bg: 'hsl(var(--secondary))' },
    shortlisted: { label: 'Shortlisted', color: 'warning', bg: 'hsl(var(--warning)/0.1)' },
    interview: { label: 'Interview', color: 'ai', bg: 'hsl(var(--primary)/0.1)' },
    offer: { label: 'Offer', color: 'success', bg: 'hsl(var(--success)/0.1)' },
    rejected: { label: 'Rejected', color: 'destructive', bg: 'hsl(var(--destructive)/0.1)' },
};

const columns = ['applied', 'shortlisted', 'interview', 'offer', 'rejected'];

export default function ApplicationTrackerPage() {
    const [activeView, setActiveView] = useState('kanban');

    const views = [
        { label: 'Kanban Board', value: 'kanban' },
        { label: 'Timeline', value: 'timeline' },
    ];

    const getByStatus = (status) => applications.filter((a) => a.status === status);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-[hsl(var(--primary))]" /> Application Tracker
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">{applications.length} total applications</p>
                </div>
            </motion.div>

            <motion.div variants={item}>
                <Tabs tabs={views} activeTab={activeView} onTabChange={setActiveView} />
            </motion.div>

            {activeView === 'kanban' && (
                <motion.div variants={item} className="flex gap-4 overflow-x-auto pb-4">
                    {columns.map((status) => {
                        const config = statusConfig[status];
                        const items = getByStatus(status);
                        return (
                            <div key={status} className="min-w-[260px] flex-1">
                                <div className="flex items-center gap-2 mb-3 px-1">
                                    <Badge variant={config.color}>{config.label}</Badge>
                                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{items.length}</span>
                                </div>
                                <div className="space-y-3 kanban-column">
                                    {items.map((app) => (
                                        <Card key={app.id} hover className="cursor-pointer">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--secondary))] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{app.company.slice(0, 2)}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-sm truncate">{app.company}</p>
                                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{app.role}</p>
                                                        <p className="text-xs font-medium text-[hsl(var(--primary))] mt-1">{app.package}</p>
                                                        {app.round && (
                                                            <Badge variant="secondary" className="mt-2 text-[10px]">{app.round}</Badge>
                                                        )}
                                                        {app.interviewDate && (
                                                            <div className="flex items-center gap-1 mt-2 text-[10px] text-[hsl(var(--muted-foreground))]">
                                                                <Calendar className="w-3 h-3" />
                                                                {new Date(app.interviewDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {items.length === 0 && (
                                        <div className="p-4 text-center text-xs text-[hsl(var(--muted-foreground))] rounded-xl border border-dashed border-[hsl(var(--border))]">
                                            No applications
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            )}

            {activeView === 'timeline' && (
                <motion.div variants={item} className="space-y-0 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[hsl(var(--border))]" />
                    {[...applications].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)).map((app, i) => {
                        const config = statusConfig[app.status];
                        return (
                            <motion.div key={app.id} variants={item} className="relative pl-14 pb-6">
                                <div className="absolute left-[18px] top-1 w-4 h-4 rounded-full border-2 border-[hsl(var(--primary))] bg-[hsl(var(--card))] z-10" />
                                <Card hover>
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold">{app.company} — {app.role}</p>
                                                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                                                    Applied {new Date(app.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                                {app.round && <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Current: {app.round}</p>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-[hsl(var(--primary))]">{app.package}</span>
                                                <Badge variant={config.color}>{config.label}</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </motion.div>
    );
}
