import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/SharedUI';
import { useNotificationStore } from '../../stores/notificationStore';
import { Bell, CheckCheck, Briefcase, Brain, FileText, ClipboardList, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const typeIcons = {
    drive: Briefcase, ai: Sparkles, assessment: FileText,
    application: ClipboardList, policy: Shield,
};
const typeColors = {
    drive: 'hsl(var(--primary))', ai: 'hsl(var(--accent))', assessment: 'hsl(var(--warning))',
    application: 'hsl(var(--success))', policy: 'hsl(var(--muted-foreground))',
};

export default function NotificationCenterPage() {
    const { notifications, filter, setFilter, markAsRead, markAllAsRead, getFiltered, unreadCount } = useNotificationStore();
    const navigate = useNavigate();

    const tabs = [
        { label: 'All', value: 'all', count: notifications.length },
        { label: 'Unread', value: 'unread', count: unreadCount },
        { label: 'Drives', value: 'drive' },
        { label: 'AI', value: 'ai' },
        { label: 'Applications', value: 'application' },
    ];

    const filtered = getFiltered();

    const timeAgo = (timestamp) => {
        const diff = Date.now() - new Date(timestamp).getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="w-6 h-6 text-[hsl(var(--primary))]" /> Notifications</h1>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">{unreadCount} unread notifications</p>
                </div>
                {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                        <CheckCheck className="w-4 h-4" /> Mark all read
                    </Button>
                )}
            </motion.div>

            <motion.div variants={item}>
                <Tabs tabs={tabs} activeTab={filter} onTabChange={setFilter} />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-[hsl(var(--muted-foreground))]">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No notifications</p>
                    </div>
                ) : (
                    filtered.map((n) => {
                        const Icon = typeIcons[n.type] || Bell;
                        const color = typeColors[n.type] || 'hsl(var(--muted-foreground))';
                        return (
                            <Card
                                key={n.id}
                                hover
                                className={`cursor-pointer transition-all ${!n.read ? 'border-l-2 border-l-[hsl(var(--primary))]' : ''}`}
                                onClick={() => { markAsRead(n.id); if (n.actionUrl) navigate(n.actionUrl); }}
                            >
                                <CardContent className="p-4 flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                                        <Icon className="w-4 h-4" style={{ color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>{n.title}</p>
                                            {!n.read && <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />}
                                        </div>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 line-clamp-2">{n.message}</p>
                                    </div>
                                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] whitespace-nowrap shrink-0">{timeAgo(n.timestamp)}</span>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </motion.div>
        </motion.div>
    );
}
