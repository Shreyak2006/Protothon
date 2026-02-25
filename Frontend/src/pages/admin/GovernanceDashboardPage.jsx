import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { placementStats, departmentStats, companyManagement } from '../../data/mockData';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip as RTooltip, CartesianGrid } from 'recharts';
import { Shield, Users, Building2, TrendingUp, Award, Briefcase, AlertCircle, Settings, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function GovernanceDashboardPage() {
    const navigate = useNavigate();

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-[hsl(var(--primary))]" /> Admin Governance</h1>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">Placement oversight and management</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate('/policy')}><Settings className="w-4 h-4" /> Policy Config</Button>
                    <Button size="sm" onClick={() => navigate('/analytics')}><TrendingUp className="w-4 h-4" /> Analytics</Button>
                </div>
            </motion.div>

            {/* Overview Stats */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: placementStats.totalStudents.toLocaleString(), icon: Users, color: 'hsl(var(--primary))' },
                    { label: 'Placed', value: placementStats.placed.toLocaleString(), icon: Award, color: 'hsl(var(--success))' },
                    { label: 'Placement Rate', value: `${placementStats.placementRate}%`, icon: TrendingUp, color: 'hsl(var(--warning))' },
                    { label: 'Avg Package', value: `₹${placementStats.avgPackage}L`, icon: Briefcase, color: 'hsl(var(--accent))' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${stat.color}15` }}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <div><p className="text-xl font-bold">{stat.value}</p><p className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</p></div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department Performance */}
                <motion.div variants={item}>
                    <Card>
                        <CardHeader><CardTitle>Department Placement Rate</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={departmentStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="department" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <RTooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 13 }} />
                                    <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Eligibility Monitor */}
                <motion.div variants={item}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2"><AlertCircle className="w-5 h-5 text-[hsl(var(--warning))]" /> Eligibility Monitor</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {departmentStats.map((dept) => (
                                <div key={dept.department} className="flex items-center gap-3">
                                    <span className="text-sm font-medium w-14">{dept.department}</span>
                                    <div className="flex-1 h-6 rounded-full bg-[hsl(var(--secondary))] overflow-hidden flex">
                                        <div className="h-full bg-[hsl(var(--success))] transition-all" style={{ width: `${dept.rate}%` }} />
                                        <div className="h-full bg-[hsl(var(--destructive)/0.3)]" style={{ width: `${100 - dept.rate}%` }} />
                                    </div>
                                    <span className="text-sm font-medium tabular-nums w-16 text-right">{dept.placed}/{dept.total}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Company Management */}
            <motion.div variants={item}>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-[hsl(var(--primary))]" /> Company Management</CardTitle>
                            <Button variant="outline" size="sm">+ Add Company</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[hsl(var(--secondary))]">
                                        <th className="text-left p-3 font-medium">Company</th>
                                        <th className="text-left p-3 font-medium">Tier</th>
                                        <th className="text-left p-3 font-medium">Visits</th>
                                        <th className="text-left p-3 font-medium">Contact</th>
                                        <th className="text-left p-3 font-medium">Status</th>
                                        <th className="text-left p-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companyManagement.map((c) => (
                                        <tr key={c.id} className="border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                                            <td className="p-3 font-medium">{c.name}</td>
                                            <td className="p-3"><Badge variant={c.tier === 1 ? 'default' : c.tier === 2 ? 'secondary' : 'outline'}>Tier {c.tier}</Badge></td>
                                            <td className="p-3">{c.visits}</td>
                                            <td className="p-3"><span className="text-xs text-[hsl(var(--muted-foreground))]">{c.contactPerson}</span></td>
                                            <td className="p-3"><Badge variant={c.status === 'confirmed' ? 'success' : 'warning'}>{c.status}</Badge></td>
                                            <td className="p-3"><Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
