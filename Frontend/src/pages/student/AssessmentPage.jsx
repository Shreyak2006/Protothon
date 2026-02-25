import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { assessments } from '../../data/mockData';
import {
    FileText,
    Clock,
    CheckCircle,
    Play,
    BarChart3,
    AlertCircle,
    Code,
    BookOpen,
    Sparkles,
    Search,
    Filter,
    ArrowUpRight,
    Command,
    Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
};

const typeIcons = {
    Coding: Code,
    Theory: BookOpen,
    MCQ: FileText,
    Mixed: BarChart3
};

export default function AssessmentPage() {
    const navigate = useNavigate();
    const [selectedTest, setSelectedTest] = useState(null);
    const [filter, setFilter] = useState('all');

    const available = assessments.filter((a) => a.status === 'available');
    const completed = assessments.filter((a) => a.status === 'completed');

    const handleStartTest = (test) => {
        if (test.type === 'Coding') {
            navigate(`/assessments/coding/${test.id}`);
        } else {
            navigate(`/assessments/player/${test.id}`);
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white italic">Tests & Logic</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">Measure your technical prowess and secure your dream offer.</p>
                </div>

                <div className="flex bg-muted/30 p-1 rounded-2xl border border-border">
                    {['all', 'available', 'completed'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                                filter === tab ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Available Jobs', val: available.length, icon: Play, color: 'primary' },
                    { label: 'Completed', val: completed.length, icon: CheckCircle, color: 'emerald-500' },
                    { label: 'Avg Rating', val: '92%', icon: Trophy, color: 'amber-500' },
                    { label: 'Global Rank', val: '#128', icon: BarChart3, color: 'blue-500' }
                ].map((stat, i) => (
                    <Card key={i} className="bg-card/50 border-border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}/5 blur-3xl rounded-full`} />
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("p-3 rounded-2xl", `bg-${stat.color}/10`)}>
                                    <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-3xl font-extrabold text-white mb-1">{stat.val}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Available Tests — Left Side */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Priority Assessments
                        </h2>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                            <Command className="w-3 h-3" /> F to Search
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(filter === 'all' || filter === 'available') && available.map((test) => {
                            const TypeIcon = typeIcons[test.type] || FileText;
                            return (
                                <Card
                                    key={test.id}
                                    className="group bg-card/40 border-border hover:bg-card/60 transition-all duration-300 rounded-[2rem] overflow-hidden"
                                >
                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                                <TypeIcon className="w-7 h-7 text-primary" />
                                            </div>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                                difficultyColors[test.difficulty]
                                            )}>
                                                {test.difficulty}
                                            </span>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{test.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">Master complex algorithms and system design patterns used by top tech firms.</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {test.topics.map((t) => (
                                                <Badge key={t} variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground border-white/10 px-3 py-1">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <div className="flex gap-4">
                                                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                                    <Clock className="w-3.5 h-3.5" /> {test.duration} MIN
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                                    <FileText className="w-3.5 h-3.5" /> {test.questions} QUES
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => setSelectedTest(test)}
                                                className="h-10 rounded-xl px-6 bg-white text-black hover:bg-primary hover:text-white transition-all font-bold text-xs"
                                            >
                                                Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Performance Snapshot — Right Side */}
                <div className="lg:col-span-4 space-y-6">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Recap & Results
                    </h2>

                    <div className="bg-card/30 border border-border p-6 rounded-[2rem] space-y-6">
                        {(filter === 'all' || filter === 'completed') && completed.map((test) => (
                            <div key={test.id} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-3 rounded-2xl transition-all">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-bold text-sm text-white truncate">{test.title}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase mt-1">
                                        <span>{test.type}</span>
                                        <span className="opacity-30">•</span>
                                        <span>8th Jan 2024</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-emerald-500 leading-none">{test.score}%</p>
                                    <Badge className="mt-1 h-1.5 w-12 bg-emerald-500/20" />
                                </div>
                            </div>
                        ))}

                        {completed.length === 0 && (
                            <div className="text-center py-12 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto">
                                    <AlertCircle className="w-8 h-8 text-muted-foreground opacity-20" />
                                </div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">No completed tests yet.</p>
                            </div>
                        )}

                        <Button variant="outline" className="w-full h-12 rounded-xl border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest">
                            Download Certificate Packet
                        </Button>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-accent relative overflow-hidden group">
                        <Sparkles className="absolute top-4 right-4 w-12 h-12 text-white/10 group-hover:scale-125 transition-transform duration-700" />
                        <h4 className="text-white font-black text-lg mb-3">Master System Design</h4>
                        <p className="text-white/80 text-xs leading-relaxed mb-6">Our high-priority assessment for Google, Meta, and Netflix is now live. Rank top 5% to get fast-tracked.</p>
                        <Button className="w-full bg-white text-black hover:bg-black hover:text-white font-bold h-12 rounded-2xl text-xs uppercase tracking-widest">
                            Go To Prep Material
                        </Button>
                    </div>
                </div>
            </div>

            {/* Premium Test Initiation Modal */}
            <AnimatePresence>
                {selectedTest && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setSelectedTest(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative bg-card rounded-[3rem] shadow-2xl border border-border p-10 max-w-xl w-full mx-4 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />

                            <div className="relative space-y-8">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.2em] font-black text-[10px]">Entrance Gate</Badge>
                                        <h2 className="text-3xl font-black text-white italic tracking-tight">{selectedTest.title}</h2>
                                    </div>
                                    <div className="w-16 h-16 rounded-[2rem] bg-muted/30 flex items-center justify-center border border-border">
                                        <Command className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { l: 'Duration', v: `${selectedTest.duration}m`, i: Clock },
                                        { l: 'Complexity', v: selectedTest.difficulty, i: BarChart3 },
                                        { l: 'Questions', v: selectedTest.questions, i: FileText },
                                        { l: 'Format', v: selectedTest.type, i: Code }
                                    ].map((x, i) => (
                                        <div key={i} className="bg-muted/20 border border-border p-4 rounded-2xl flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                                <x.i className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest leading-none mb-1">{x.l}</p>
                                                <p className="text-sm font-black text-white">{x.v}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                                    <div className="flex items-center gap-3 text-amber-500">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <h4 className="text-xs font-black uppercase tracking-widest">Testing Protocol</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium capitalize">
                                        Once the barrier is breached, the chronometer will not stop. Ensure your environment is secure and connectivity is optimal. Plagiarism detection is actively scanning.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 font-bold uppercase text-xs tracking-widest" onClick={() => setSelectedTest(null)}>Abort</Button>
                                    <Button className="flex-[1.5] h-14 rounded-2xl bg-white text-black hover:bg-primary hover:text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/20" onClick={() => handleStartTest(selectedTest)}>
                                        Initiate Protocol
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
