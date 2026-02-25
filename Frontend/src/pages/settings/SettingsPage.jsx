import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Separator } from '../../components/ui/SharedUI';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from '../../components/ui/Toast';
import { Settings, Sun, Moon, Monitor, Bell, Shield, User, Eye, EyeOff, Save, Lock, Palette } from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function SettingsPage() {
    const { theme, setTheme } = useUIStore();
    const { user } = useAuthStore();
    const { addToast } = useToast();
    const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, drive: true, application: true, policy: false });
    const [privacy, setPrivacy] = useState({ showProfile: true, aiRecommendations: true, shareSkillData: true });

    const themes = [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor },
    ];

    const handleSave = () => {
        addToast({ type: 'success', title: 'Settings saved', message: 'Your preferences have been updated.' });
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-3xl">
            <motion.div variants={item}>
                <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-[hsl(var(--primary))]" /> Settings</h1>
                <p className="text-[hsl(var(--muted-foreground))] mt-1">Manage your account and preferences</p>
            </motion.div>

            {/* Theme */}
            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-[hsl(var(--primary))]" /> Appearance</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Choose your preferred theme</p>
                        <div className="flex gap-3">
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => setTheme(t.value)}
                                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${theme === t.value
                                        ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]'
                                        : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.3)]'
                                        }`}
                                >
                                    <t.icon className={`w-6 h-6 ${theme === t.value ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`} />
                                    <span className="text-sm font-medium">{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-[hsl(var(--primary))]" /> Notifications</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                            { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                            { key: 'sms', label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
                            { key: 'drive', label: 'Drive Alerts', desc: 'New placement drive notifications' },
                            { key: 'application', label: 'Application Updates', desc: 'Status changes on applications' },
                            { key: 'policy', label: 'Policy Changes', desc: 'Policy update notifications' },
                        ].map((pref) => (
                            <div key={pref.key} className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-sm font-medium">{pref.label}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{pref.desc}</p>
                                </div>
                                <button
                                    onClick={() => setNotifications((p) => ({ ...p, [pref.key]: !p[pref.key] }))}
                                    role="switch"
                                    aria-checked={notifications[pref.key]}
                                    aria-label={pref.label}
                                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${notifications[pref.key] ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--secondary))]'
                                        }`}
                                >
                                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[pref.key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Security */}
            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-[hsl(var(--primary))]" /> Security</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" placeholder="••••••••" />
                        </div>
                        <Button variant="outline" size="sm"><Lock className="w-4 h-4" /> Update Password</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Privacy */}
            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-[hsl(var(--primary))]" /> Privacy</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { key: 'showProfile', label: 'Show profile to recruiters' },
                            { key: 'aiRecommendations', label: 'Allow AI-based recommendations' },
                            { key: 'shareSkillData', label: 'Share skill data with placement cell' },
                        ].map((pref) => (
                            <div key={pref.key} className="flex items-center justify-between py-2">
                                <p className="text-sm font-medium">{pref.label}</p>
                                <button
                                    onClick={() => setPrivacy((p) => ({ ...p, [pref.key]: !p[pref.key] }))}
                                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${privacy[pref.key] ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--secondary))]'}`}
                                    role="switch"
                                    aria-checked={privacy[pref.key]}
                                    aria-label={pref.label}
                                >
                                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${privacy[pref.key] ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Button onClick={handleSave} className="w-full sm:w-auto"><Save className="w-4 h-4" /> Save All Changes</Button>
            </motion.div>
        </motion.div>
    );
}
