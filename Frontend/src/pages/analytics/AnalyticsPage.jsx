import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import { placementStats, departmentStats, salaryDistribution, hiringTrends } from '../../data/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip as RTooltip, CartesianGrid, Legend } from 'recharts';
import { BarChart3, Download, TrendingUp, DollarSign, Users, Building2 } from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const COLORS = ['hsl(217,91%,60%)', 'hsl(142,71%,45%)', 'hsl(38,92%,50%)', 'hsl(280,67%,60%)', 'hsl(350,80%,60%)', 'hsl(180,60%,45%)', 'hsl(15,80%,55%)'];

export default function AnalyticsPage() {
    const [year, setYear] = useState('2026');

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6 text-[hsl(var(--primary))]" /> Analytics & Reports</h1>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">Comprehensive placement insights and trends</p>
                </div>
                <div className="flex gap-2">
                    <Select value={year} onChange={(e) => setYear(e.target.value)} className="w-32">
                        <option value="2026">2025-26</option>
                        <option value="2025">2024-25</option>
                        <option value="2024">2023-24</option>
                    </Select>
                    <Button variant="outline" size="sm"><Download className="w-4 h-4" /> Export</Button>
                </div>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Placement Rate', value: `${placementStats.placementRate}%`, icon: TrendingUp, color: 'hsl(var(--success))' },
                    { label: 'Avg Package', value: `₹${placementStats.avgPackage}L`, icon: DollarSign, color: 'hsl(var(--primary))' },
                    { label: 'Highest CTC', value: `₹${placementStats.highestPackage}L`, icon: TrendingUp, color: 'hsl(var(--warning))' },
                    { label: 'Companies', value: placementStats.totalCompanies, icon: Building2, color: 'hsl(var(--accent))' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <div><p className="text-xl font-bold">{stat.value}</p><p className="text-xs text-[hsl(var(--muted-foreground))]">{stat.label}</p></div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={item}>
                    <Card>
                        <CardHeader><CardTitle>Hiring Trends (6 Years)</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={hiringTrends}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="year" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <RTooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 13 }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="placed" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} name="Placed" />
                                    <Line type="monotone" dataKey="companies" stroke="hsl(var(--success))" strokeWidth={2.5} dot={{ r: 4 }} name="Companies" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card>
                        <CardHeader><CardTitle>Salary Distribution</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={salaryDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="range" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <RTooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 13 }} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                        {salaryDistribution.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle>Department-wise Comparison</CardTitle></CardHeader>
                    <CardContent>
                        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[hsl(var(--secondary))]">
                                        <th className="text-left p-3 font-medium">Department</th>
                                        <th className="text-left p-3 font-medium">Placed</th>
                                        <th className="text-left p-3 font-medium">Total</th>
                                        <th className="text-left p-3 font-medium">Rate</th>
                                        <th className="text-left p-3 font-medium">Avg Package</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentStats.map((d) => (
                                        <tr key={d.department} className="border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                                            <td className="p-3 font-medium">{d.department}</td>
                                            <td className="p-3">{d.placed}</td>
                                            <td className="p-3">{d.total}</td>
                                            <td className="p-3"><Badge variant={d.rate >= 75 ? 'success' : d.rate >= 50 ? 'warning' : 'destructive'}>{d.rate}%</Badge></td>
                                            <td className="p-3 font-medium">₹{d.avgPackage}L</td>
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
