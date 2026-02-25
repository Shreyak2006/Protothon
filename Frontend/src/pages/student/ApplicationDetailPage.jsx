import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Building2,
    Calendar,
    MapPin,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowUpRight,
    MessageSquare,
    Link as LinkIcon,
    Download,
    Eye,
    Star
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { cn } from '../../lib/utils';
import { useNavigate, useParams } from 'react-router-dom';

const TIMELINE = [
    { stage: 'Applied', date: 'Jan 12, 2024', status: 'completed', desc: 'Application submitted successfully.' },
    { stage: 'Shortlisted', date: 'Jan 15, 2024', status: 'completed', desc: 'You have been shortlisted based on your AI Match Score.' },
    { stage: 'Technical Assessment', date: 'Jan 18, 2024', status: 'completed', desc: 'Score: 92/100 (Top 5%).' },
    { stage: 'Technical Interview', date: 'Jan 22, 2024', status: 'active', desc: 'Scheduled for 2:30 PM IST via Google Meet.' },
    { stage: 'HR Round', date: 'TBD', status: 'pending', desc: 'Final conversation regarding culture and compensation.' }
];

export default function ApplicationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="space-y-10 pb-20">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                        <ChevronLeft className="w-6 h-6 text-muted-foreground" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-black text-white italic tracking-tight">Software Engineer II</h1>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 uppercase tracking-widest text-[10px] py-1 px-3">Active Selection</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground font-semibold text-sm">
                            <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Google India</div>
                            <div className="w-1 h-1 rounded-full bg-border" />
                            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Bangalore, Hybrid</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={cn(
                            "w-12 h-12 rounded-2xl border flex items-center justify-center transition-all",
                            isFavorite ? "bg-amber-500/10 border-amber-500/30 text-amber-500" : "bg-card border-border text-muted-foreground hover:border-primary/50"
                        )}
                    >
                        <Star className={cn("w-5 h-5", isFavorite && "fill-current")} />
                    </button>
                    <Button variant="outline" className="h-12 rounded-2xl px-6 border-border text-xs font-black uppercase tracking-widest">
                        <Download className="mr-2 w-4 h-4" /> PDF Packet
                    </Button>
                    <Button className="h-12 rounded-2xl px-6 shadow-2xl shadow-primary/20 text-xs font-black uppercase tracking-widest">
                        Contact Recruiter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Side — Details & Timeline */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Status Progress */}
                    <Card className="bg-card/40 border-border rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-10">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Selection Journey
                            </h2>
                            <div className="relative">
                                <div className="absolute top-5 left-6 right-6 h-[2px] bg-border" />
                                <div className="absolute top-5 left-6 w-1/2 h-[2px] bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                                <div className="flex justify-between relative z-10">
                                    {TIMELINE.map((item, i) => (
                                        <div key={i} className="flex flex-col items-center max-w-[120px] text-center">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                                                item.status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" :
                                                    item.status === 'active' ? "bg-primary border-primary text-white shadow-xl shadow-primary/30 scale-110" :
                                                        "bg-card border-border text-muted-foreground"
                                            )}>
                                                {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-5 h-5" />}
                                            </div>
                                            <p className={cn("text-[10px] font-black uppercase tracking-widest mt-4 mb-1", item.status === 'pending' ? "text-muted-foreground" : "text-white")}>{item.stage}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{item.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Stage Feedback */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" /> Activity Log
                        </h2>
                        <div className="space-y-4">
                            {TIMELINE.reverse().map((item, i) => (
                                <div key={i} className={cn("p-6 rounded-3xl border transition-all", item.status === 'active' ? "bg-primary/5 border-primary/20" : "bg-card/30 border-border opacity-70")}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-black text-white italic tracking-tight">{item.stage}</h3>
                                        <Badge className={cn(
                                            "uppercase text-[9px] tracking-widest px-3",
                                            item.status === 'completed' ? "bg-emerald-500/20 text-emerald-500" :
                                                item.status === 'active' ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                                        )}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                                    {item.status === 'active' && (
                                        <div className="mt-6 flex gap-3">
                                            <Button size="sm" className="h-10 rounded-xl px-6 text-[10px] font-black uppercase tracking-widest">
                                                Join Meeting
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-10 rounded-xl px-6 text-[10px] font-black uppercase tracking-widest border-white/10">
                                                Reschedule Request
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side — Job Metadata & Resources */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Recruiter Details */}
                    <div className="bg-card/40 border border-border rounded-3xl p-8 space-y-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Primary Recruiter</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-[1px]">
                                <img src="https://i.pravatar.cc/100?u=sarah" className="w-full h-full rounded-2xl object-cover" alt="Sarah J." />
                            </div>
                            <div>
                                <p className="font-black text-white italic">Sarah Jenkins</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Talent Acquisition Lead</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer">
                                <LinkIcon className="w-4 h-4" /> LinkedIn Profile
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer">
                                <MessageSquare className="w-4 h-4" /> Send Message
                            </div>
                        </div>
                    </div>

                    {/* Interview Prep Card */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-emerald-500/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
                        <h4 className="text-2xl font-black italic tracking-tight mb-3">Interview Ready?</h4>
                        <p className="text-white/80 text-xs leading-relaxed font-bold uppercase tracking-wider mb-8">We've generated a custom prep packet for Google's System Design rounds based on your previous scores.</p>
                        <Button className="w-full bg-white text-black hover:bg-black hover:text-white font-black h-12 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl">
                            <Download className="mr-2 w-4 h-4" /> Get Prep Material
                        </Button>
                    </div>

                    {/* Job Details Quick View */}
                    <div className="p-6 border border-white/5 rounded-3xl space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Job Snapshot</h4>
                        <div className="space-y-4">
                            {[
                                { l: 'Salary / CTC', v: '₹32L - ₹45L PA' },
                                { l: 'Opening Ends', v: '12th Feb 2024' },
                                { l: 'Candidates', v: '2,450+ Applied' },
                                { l: 'AI Match', v: '94% compatible' }
                            ].map((x, i) => (
                                <div key={i} className="flex justify-between items-center group cursor-default">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{x.l}</span>
                                    <span className="text-xs font-black text-white group-hover:text-primary transition-colors">{x.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
