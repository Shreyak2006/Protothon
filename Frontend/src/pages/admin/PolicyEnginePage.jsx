import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/SharedUI';
import { placementPolicies } from '../../data/mockData';
import { Scale, Shield, AlertTriangle, CheckCircle, Code, Play, Edit3, Trash2 } from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function PolicyEnginePage() {
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><Scale className="w-6 h-6 text-[hsl(var(--primary))]" /> Policy Engine</h1>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">Configure and visualize placement governance rules</p>
                </div>
                <Button size="sm">+ Create Policy</Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-[hsl(var(--success)/0.1)] to-transparent border-[hsl(var(--success)/0.2)]">
                    <CardContent className="p-5 text-center">
                        <p className="text-3xl font-bold text-[hsl(var(--success))]">{placementPolicies.filter((p) => p.status === 'active').length}</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Active Policies</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-[hsl(var(--warning)/0.1)] to-transparent border-[hsl(var(--warning)/0.2)]">
                    <CardContent className="p-5 text-center">
                        <p className="text-3xl font-bold text-[hsl(var(--warning))]">{placementPolicies.reduce((sum, p) => sum + p.violations, 0)}</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Total Violations</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-transparent border-[hsl(var(--primary)/0.2)]">
                    <CardContent className="p-5 text-center">
                        <p className="text-3xl font-bold text-[hsl(var(--primary))]">{placementPolicies.filter((p) => p.status === 'draft').length}</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Draft Policies</p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item} className="space-y-4">
                {placementPolicies.map((policy) => (
                    <Card key={policy.id} hover>
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${policy.status === 'active' ? 'bg-[hsl(var(--success)/0.1)]' : 'bg-[hsl(var(--secondary))]'}`}>
                                        {policy.status === 'active' ? <CheckCircle className="w-5 h-5 text-[hsl(var(--success))]" /> : <Shield className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{policy.name}</h3>
                                            <Badge variant={policy.status === 'active' ? 'success' : 'secondary'}>{policy.status}</Badge>
                                            <Badge variant="outline" className="text-[10px]">{policy.type}</Badge>
                                        </div>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">{policy.description}</p>
                                        <div className="p-2.5 rounded-lg bg-[hsl(var(--secondary))] font-mono text-xs text-[hsl(var(--muted-foreground))]">
                                            <Code className="w-3 h-3 inline mr-2" />{policy.logic}
                                        </div>
                                        {policy.violations > 0 && (
                                            <div className="mt-2 flex items-center gap-1.5 text-xs text-[hsl(var(--warning))]">
                                                <AlertTriangle className="w-3 h-3" /> {policy.violations} violations detected
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1.5 shrink-0">
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedPolicy(policy)}><Play className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon"><Edit3 className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(policy)}><Trash2 className="w-4 h-4 text-[hsl(var(--destructive))]" /></Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Simulation Modal */}
            {selectedPolicy && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPolicy(null)} />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-[hsl(var(--card))] rounded-2xl shadow-2xl border border-[hsl(var(--border))] p-6 max-w-md w-full mx-4">
                        <h2 className="text-lg font-bold mb-1">Policy Simulation</h2>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{selectedPolicy.name}</p>
                        <div className="space-y-3 mb-4">
                            <div className="p-3 rounded-xl bg-[hsl(var(--secondary))]">
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Rule Logic</p>
                                <p className="font-mono text-sm">{selectedPolicy.logic}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[hsl(var(--success)/0.1)] border border-[hsl(var(--success)/0.2)]">
                                <p className="text-sm font-medium text-[hsl(var(--success))]">✓ Simulation passed — 94% of students comply</p>
                            </div>
                        </div>
                        <Button className="w-full" onClick={() => setSelectedPolicy(null)}>Close</Button>
                    </motion.div>
                </div>
            )}

            <ConfirmDialog
                open={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={() => setDeleteConfirm(null)}
                title="Delete Policy"
                message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                variant="destructive"
            />
        </motion.div>
    );
}
