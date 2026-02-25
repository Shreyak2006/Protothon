import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    User,
    Briefcase,
    BookOpen,
    Code,
    FileText,
    Mail,
    Globe,
    MapPin,
    CheckCircle2,
    AlertCircle,
    Star,
    MessageSquare,
    Link as LinkIcon,
    Download,
    Eye,
    Zap,
    Trophy,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { cn } from '../../lib/utils';
import { useNavigate, useParams } from 'react-router-dom';

const colorMap = {
    'emerald-500': 'text-emerald-500',
    'primary': 'text-[hsl(var(--primary))]',
};

export default function CandidateDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [action, setAction] = useState(null); // 'shortlist' | 'reject' | null

    const student = {
        name: 'Arjun Mehta',
        role: 'Fullstack Developer',
        matchScore: 94,
        university: 'IIT Delhi',
        cgpa: 9.2,
        skills: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Docker'],
        assessments: [
            { name: 'System Design', score: 92 },
            { name: 'Algorithms', score: 98 },
            { name: 'OOP Concepts', score: 85 }
        ],
        experience: [
            { company: 'Microsoft India', role: 'Software Engineering Intern', duration: '3 Months' }
        ]
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Nav & Quick Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                        <ChevronLeft className="w-6 h-6 text-muted-foreground" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-black text-white italic tracking-tight">{student.name}</h1>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                                <Zap className="w-3 h-3 fill-current" /> Top 1% Match
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground font-semibold text-sm">
                            <div className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Portfolio</div>
                            <div className="w-1 h-1 rounded-full bg-border" />
                            <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {student.university}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-14 rounded-2xl px-8 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-black uppercase text-xs tracking-[0.2em]" onClick={() => setAction('reject')}>
                        Reject
                    </Button>
                    <Button className="h-14 rounded-2xl px-10 bg-emerald-600 hover:bg-emerald-700 shadow-2xl shadow-emerald-500/20 font-black uppercase text-xs tracking-[0.2em]" onClick={() => setAction('shortlist')}>
                        Shortlist Candidate
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Side — Core Profile */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Intelligence Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-card/40 border-border p-8 rounded-[2rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Match Score</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white italic">{student.matchScore}</span>
                                <span className="text-xl font-bold text-primary">%</span>
                            </div>
                            <Progress value={student.matchScore} className="h-1.5 mt-6" />
                        </Card>
                        <Card className="bg-card/40 border-border p-8 rounded-[2rem]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Skill Rank</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-emerald-500 italic">S+</span>
                                <Trophy className="w-6 h-6 text-amber-500 ml-auto" />
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-6">Superior proficiency</p>
                        </Card>
                        <Card className="bg-card/40 border-border p-8 rounded-[2rem]">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Academic CGPA</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white italic">{student.cgpa}</span>
                                <span className="text-lg font-bold text-muted-foreground">/ 10</span>
                            </div>
                            <div className="flex gap-1.5 mt-6">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= 4 ? "bg-primary" : "bg-muted")} />)}
                            </div>
                        </Card>
                    </div>

                    {/* Assessment Deep-dive */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Verified Assessment Scores
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {student.assessments.map((test, i) => (
                                <div key={i} className="bg-card/30 border border-border p-6 rounded-3xl flex items-center justify-between group hover:bg-card/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                            <Code className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-black text-white italic">{test.name}</p>
                                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                                                <ShieldCheck className="w-3 h-3 text-emerald-500" /> AI-Proctored
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-white leading-none">{test.score}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical Profile */}
                    <div className="bg-card/40 border border-border rounded-[2.5rem] p-10 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" /> Technical Arsenal
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {student.skills.map((skill, i) => (
                                    <span key={i} className="px-5 py-2.5 bg-muted/30 text-white rounded-2xl text-xs font-black uppercase tracking-widest border border-white/5 hover:border-primary/50 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" /> Industry Experience
                            </h2>
                            {student.experience.map((exp, i) => (
                                <div key={i} className="flex gap-6 items-start relative pb-10 last:pb-0">
                                    {i < student.experience.length - 1 && <div className="absolute top-16 left-8 bottom-0 w-[2px] bg-border" />}
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-card border border-border flex items-center justify-center shrink-0 shadow-lg relative z-10">
                                        <Briefcase className="w-7 h-7 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-2 pt-1">
                                        <h3 className="text-xl font-black text-white italic tracking-tight">{exp.company}</h3>
                                        <p className="text-emerald-500 font-bold uppercase text-[10px] tracking-[0.2em]">{exp.role} • {exp.duration}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">Designed and implemented high-performance microservices, reducing latency by 40% across the core payment gateway.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side — Documents & Insights */}
                <div className="lg:col-span-4 space-y-10">
                    {/* Resume Card */}
                    <div className="bg-card/40 border border-border rounded-[2.5rem] p-8 text-center space-y-6">
                        <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto border border-primary/20">
                            <FileText className="w-10 h-10 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-black text-white italic">Resume_Arjun_V2.pdf</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Verified by OCR Engine</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1 h-12 rounded-2xl border-white/10 text-[10px] font-black uppercase tracking-widest">
                                <Eye className="mr-2 w-4 h-4" /> View
                            </Button>
                            <Button className="flex-1 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                                <Download className="mr-2 w-4 h-4" /> Save
                            </Button>
                        </div>
                    </div>

                    {/* Governance Insights */}
                    <div className="bg-card/40 border border-border rounded-[2.5rem] p-8 space-y-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Governance Clearance</h3>
                        <div className="space-y-4">
                            {[
                                { l: 'Policy Status', v: 'Green (Compliant)', c: 'emerald-500' },
                                { l: 'Verified Projects', v: '4 Independent', c: 'primary' },
                                { l: 'Plagiarism Audit', v: '0% Code Match', c: 'emerald-500' },
                                { l: 'Trust Score', v: '9.8 / 10', c: 'primary' }
                            ].map((x, i) => (
                                <div key={i} className="flex justify-between items-center group cursor-default">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{x.l}</span>
                                    <span className={cn("text-xs font-black", colorMap[x.c] || 'text-[hsl(var(--foreground))]')}>{x.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Predictor Card */}
                    <div className="bg-gradient-to-br from-primary to-accent rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
                        <h4 className="text-2xl font-black italic tracking-tight mb-3">Retention Forecast</h4>
                        <div className="flex items-center gap-4 mb-8">
                            <TrendingUp className="w-10 h-10 text-white/20" />
                            <p className="text-4xl font-black italic">HIGH</p>
                        </div>
                        <p className="text-white/80 text-[10px] leading-relaxed font-bold uppercase tracking-[0.2em] mb-8">Based on skill depth and career trajectory, this candidate has a 92% predicted 2-year retention rate.</p>
                        <Button className="w-full bg-white text-black hover:bg-black hover:text-white font-black h-12 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl">
                            <Star className="mr-2 w-4 h-4" /> Recommend Offer
                        </Button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal Placeholder */}
            {action && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setAction(null)} />
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-card border border-border p-10 rounded-[3rem] max-w-md w-full text-center">
                        <div className={cn(
                            "w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6",
                            action === 'shortlist' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-rose-500/10 border-rose-500/20 text-rose-500"
                        )}>
                            {action === 'shortlist' ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                        </div>
                        <h2 className="text-3xl font-black text-white italic tracking-tight mb-2 capitalize">{action} Confirm?</h2>
                        <p className="text-muted-foreground text-sm mb-10 leading-relaxed">This will trigger the next stage of the AI-governed placement pipeline and notify the candidate.</p>
                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold uppercase text-xs" onClick={() => setAction(null)}>Cancel</Button>
                            <Button className={cn("flex-[1.5] h-14 rounded-2xl font-black uppercase text-xs tracking-widest", action === 'shortlist' ? "bg-emerald-600" : "bg-rose-600")} onClick={() => navigate('/dashboard/recruiter')}>Confirm Action</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
