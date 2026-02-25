import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CircularProgress } from '../../components/ui/Progress';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { useAuthStore } from '../../stores/authStore';
import {
    studentProfile, upcomingDrives, applications, announcements, skills,
} from '../../data/mockData';
import {
    TrendingUp, Calendar, Briefcase, AlertCircle, BookOpen,
    ChevronRight, Clock, Sparkles, Zap, Target, ArrowUpRight,
    FileText,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimeReveal, AnimeTilt } from '../../components/shared/AnimeMotion';
import { AnimeCounter, AnimeProgress } from '../../components/shared/AnimeData';

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const appliedCount = applications.filter((a) => a.status === 'applied').length;
    const shortlistedCount = applications.filter((a) => a.status === 'shortlisted').length;
    const interviewCount = applications.filter((a) => a.status === 'interview').length;
    const offerCount = applications.filter((a) => a.status === 'offer').length;

    const topSkillGaps = skills.filter((s) => s.level < 60).slice(0, 3);

    return (
        <div className="space-y-10">
            {/* Header Section — Cinematic Entry */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-border/10">
                <AnimeReveal preset="slideRight">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                AI Placement Sector 7
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-white italic tracking-tighter">
                            Welcome, {user?.name?.split(' ')[0] || 'Arjun'}
                        </h1>
                        <p className="text-muted-foreground mt-2 font-medium">
                            System status: <span className="text-emerald-500 font-bold">Optimized</span> • {applications.length} Active Workflows
                        </p>
                    </div>
                </AnimeReveal>

                <AnimeReveal preset="fadeUp" delay={400}>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-2xl h-12 px-6 border-white/10" onClick={() => navigate('/dashboard/profile')}>
                            <FileText className="w-4 h-4 mr-2" /> Resume
                        </Button>
                        <Button className="rounded-2xl h-12 px-8 shadow-2xl shadow-primary/20" onClick={() => navigate('/dashboard/job-matching')}>
                            <Sparkles className="w-4 h-4 mr-2" /> Match AI
                        </Button>
                    </div>
                </AnimeReveal>
            </div>

            {/* Quick Stats Grid — Staggered Reveal + 3D Tilt */}
            <AnimeReveal cascade preset="zoomIn" delay={200} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Applied', value: appliedCount, icon: Briefcase, bgClass: 'bg-primary/10 border-primary/20', iconClass: 'text-primary' },
                    { label: 'Shortlisted', value: shortlistedCount, icon: Target, bgClass: 'bg-amber-500/10 border-amber-500/20', iconClass: 'text-amber-500' },
                    { label: 'Interviews', value: interviewCount, icon: Calendar, bgClass: 'bg-violet-500/10 border-violet-500/20', iconClass: 'text-violet-500' },
                    { label: 'Offers', value: offerCount, icon: Zap, bgClass: 'bg-emerald-500/10 border-emerald-500/20', iconClass: 'text-emerald-500' },
                ].map((stat) => (
                    <AnimeTilt key={stat.label} className="w-full">
                        <Card className="bg-card/40 border-border hover:bg-card/60 transition-colors cursor-pointer group" onClick={() => navigate('/dashboard/applications')}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-2xl border ${stat.bgClass}`}>
                                        <stat.icon className={`w-5 h-5 ${stat.iconClass}`} />
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                                <p className="text-3xl font-black text-white italic">
                                    <AnimeCounter value={stat.value} />
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
                            </CardContent>
                        </Card>
                    </AnimeTilt>
                ))}
            </AnimeReveal>

            {/* Main Content Reveal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Primary Intelligence Section */}
                <div className="lg:col-span-8 space-y-10">
                    <AnimeReveal preset="fadeUp" delay={600}>
                        <Card className="bg-card/40 border-border rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="p-10 pb-0">
                                <CardTitle className="flex items-center gap-3 text-2xl font-black italic tracking-tight">
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                    Placement Readiness
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-10">
                                <div className="flex flex-col md:flex-row items-center gap-12">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/40 transition-all duration-700" />
                                        <CircularProgress
                                            value={studentProfile.placementReady}
                                            size={180}
                                            strokeWidth={12}
                                            color="hsl(var(--primary))"
                                            className="relative z-10"
                                        >
                                            <div className="text-center">
                                                <span className="text-4xl font-black text-white italic">
                                                    <AnimeCounter value={studentProfile.placementReady} suffix="%" />
                                                </span>
                                                <span className="text-sm font-bold text-muted-foreground block uppercase mt-1">Ready</span>
                                            </div>
                                        </CircularProgress>
                                    </div>
                                    <div className="flex-1 space-y-6 w-full">
                                        {[
                                            { label: 'Technical Skills', value: 82 },
                                            { label: 'Resume Quality', value: studentProfile.atsScore },
                                            { label: 'Interview Prep', value: 65 },
                                            { label: 'Aptitude', value: 78 },
                                        ].map((item) => (
                                            <div key={item.label}>
                                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
                                                    <span className="text-muted-foreground">{item.label}</span>
                                                    <span className="text-white">
                                                        <AnimeCounter value={item.value} suffix="%" />
                                                    </span>
                                                </div>
                                                <AnimeProgress value={item.value} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimeReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Upcoming Drives Staggered */}
                        <AnimeReveal preset="fadeUp" delay={800} className="h-full">
                            <Card className="h-full bg-card/30 border-border rounded-3xl">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-3 text-lg font-black italic">
                                            <Calendar className="w-5 h-5 text-primary" /> Upcoming
                                        </CardTitle>
                                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest" onClick={() => navigate('/dashboard/job-matching')}>
                                            Full List <ChevronRight className="ml-1 w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {upcomingDrives.slice(0, 3).map((drive) => (
                                        <div key={drive.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group cursor-pointer relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full" />
                                            <div className="relative z-10 flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-black text-white italic leading-none">{drive.company}</h4>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-2 tracking-widest">{drive.role} • {drive.package}</p>
                                                </div>
                                                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 uppercase tracking-tighter text-[9px]">{drive.eligibility ? 'E' : 'X'}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </AnimeReveal>

                        <AnimeReveal preset="fadeUp" delay={1000} className="h-full">
                            <Card className="h-full bg-card/30 border-border rounded-3xl overflow-hidden p-[2px] bg-gradient-to-br from-primary/20 via-transparent to-accent/20">
                                <div className="bg-card h-full w-full rounded-[calc(1.5rem-2px)] p-6">
                                    <CardTitle className="flex items-center gap-3 text-lg font-black italic mb-6">
                                        <Briefcase className="w-5 h-5 text-primary" /> Status Log
                                    </CardTitle>
                                    <div className="space-y-4">
                                        {applications.slice(0, 3).map((app) => (
                                            <div key={app.id} className="flex justify-between items-center group">
                                                <div>
                                                    <p className="font-bold text-white text-sm group-hover:text-primary transition-colors">{app.company}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">{app.status}</p>
                                                </div>
                                                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                                    <ChevronRight className="w-4 h-4 text-primary" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full mt-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-primary transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                                        Full History
                                    </Button>
                                </div>
                            </Card>
                        </AnimeReveal>
                    </div>
                </div>

                {/* Intelligence & Actions Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                    <AnimeReveal preset="slideRight" delay={800}>
                        <AIInsightCard type="insight" title="Placement potential" confidence={87}>
                            <p className="text-sm leading-relaxed font-medium">
                                High probability matching for <span className="text-white font-bold">Tier-1 SDE</span> roles. System recommends focusing on <span className="text-primary font-bold">Low-Level Design</span> to reach Top 1% bracket.
                            </p>
                        </AIInsightCard>
                    </AnimeReveal>

                    <AnimeReveal preset="fadeUp" delay={1000}>
                        <Card className="bg-card/30 border-border rounded-3xl overflow-hidden">
                            <CardHeader className="bg-white/5 border-b border-white/5">
                                <CardTitle className="text-[11px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Core Skill Gaps
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {topSkillGaps.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2 text-white">
                                            <span>{skill.name}</span>
                                            <span className="text-amber-500">{skill.level}%</span>
                                        </div>
                                        <AnimeProgress value={skill.level} color="hsl(var(--warning))" />
                                    </div>
                                ))}
                                <Button className="w-full h-12 rounded-2xl bg-white text-black hover:bg-primary hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
                                    Start Training Lab
                                </Button>
                            </CardContent>
                        </Card>
                    </AnimeReveal>

                    <AnimeReveal preset="fadeUp" delay={1200}>
                        <Card className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/20 rounded-[2rem] p-8 relative overflow-hidden group">
                            <Sparkles className="absolute top-4 right-4 w-12 h-12 text-white/10 group-hover:scale-125 transition-transform duration-700" />
                            <h3 className="text-xl font-black italic text-white mb-2">Global Leaderboard</h3>
                            <p className="text-muted-foreground text-xs leading-relaxed mb-6 font-medium uppercase tracking-tight">You are currently ranked <span className="text-white font-black">#128</span> worldwide. Gain 50 pts to enter Next Tier.</p>
                            <Button className="w-full h-12 rounded-2xl bg-white/10 border border-white/20 hover:bg-white text-white hover:text-black font-black text-[10px] uppercase tracking-[0.3em] transition-all">
                                Jump To Arenas
                            </Button>
                        </Card>
                    </AnimeReveal>
                </div>
            </div>
        </div>
    );
}
