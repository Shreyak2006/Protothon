import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { skills, suggestedSkills, learningPaths, skillGrowthData } from '../../data/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip as RTooltip, CartesianGrid } from 'recharts';
import { Brain, TrendingUp, BookOpen, Target, ArrowUpRight, Clock, Star, Zap, ChevronRight } from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function SkillIntelligencePage() {
    const strengths = skills.filter((s) => s.level >= 75);
    const weaknesses = skills.filter((s) => s.level < 60);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item}>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Brain className="w-6 h-6 text-[hsl(var(--primary))]" /> AI Skill Intelligence
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] mt-1">Personalized skill analysis and learning recommendations</p>
            </motion.div>

            <motion.div variants={item}>
                <AIInsightCard type="insight" title="Skill Growth Analysis" confidence={91}>
                    Your technical skills improved 26% over 6 months. System Design and Cloud are key growth areas.
                </AIInsightCard>
            </motion.div>

            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[hsl(var(--primary))]" /> Skill Growth Trend</CardTitle></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={skillGrowthData}>
                                <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <RTooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 13 }} />
                                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="url(#sg)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle>Skill Proficiency</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {skills.map((skill) => (
                            <div key={skill.name}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <Badge variant="secondary" className="text-[10px]">{skill.category}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {skill.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-[hsl(var(--success))]" />}
                                        <span className="text-sm font-semibold tabular-nums">{skill.level}%</span>
                                    </div>
                                </div>
                                <Progress value={skill.level} size="sm" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={item}>
                    <Card>
                        <CardHeader><CardTitle className="text-[hsl(var(--success))] flex items-center gap-2"><Star className="w-5 h-5" /> Strengths</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            {strengths.map((s) => (
                                <div key={s.name} className="flex items-center justify-between p-2.5 rounded-lg bg-[hsl(var(--success)/0.05)] border border-[hsl(var(--success)/0.1)]">
                                    <span className="text-sm font-medium">{s.name}</span>
                                    <Badge variant="success">{s.level}%</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={item}>
                    <Card>
                        <CardHeader><CardTitle className="text-[hsl(var(--warning))] flex items-center gap-2"><Target className="w-5 h-5" /> Areas to Improve</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            {weaknesses.map((s) => (
                                <div key={s.name} className="flex items-center justify-between p-2.5 rounded-lg bg-[hsl(var(--warning)/0.05)] border border-[hsl(var(--warning)/0.1)]">
                                    <span className="text-sm font-medium">{s.name}</span>
                                    <Badge variant="warning">{s.level}%</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div variants={item}>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-[hsl(var(--primary))]" /> Suggested Skills</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {suggestedSkills.map((skill) => (
                            <div key={skill.name} className="flex items-center gap-4 p-3 rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.3)] transition-colors">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm">{skill.name}</span>
                                        <Badge variant={skill.priority === 'high' ? 'destructive' : 'warning'} className="text-[10px]">{skill.priority}</Badge>
                                    </div>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{skill.reason}</p>
                                </div>
                                <span className="text-sm font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {skill.estimatedHours}h</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[hsl(var(--primary))]" /> Learning Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {learningPaths.map((path) => (
                        <Card key={path.id} hover className="cursor-pointer">
                            <CardContent className="p-5">
                                <Badge variant="secondary" className="mb-3 text-[10px]">{path.difficulty}</Badge>
                                <h3 className="font-semibold mb-1">{path.title}</h3>
                                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">{path.description}</p>
                                <Progress value={path.progress} size="sm" showLabel />
                                <div className="flex justify-between mt-3 text-xs text-[hsl(var(--muted-foreground))]">
                                    <span>{path.completedModules}/{path.modules} modules</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {path.estimatedHours}h</span>
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-4">Continue <ChevronRight className="w-3 h-3" /></Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
