import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Progress } from '../../components/ui/Progress';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { recommendedCompanies } from '../../data/mockData';
import { useToast } from '../../components/ui/Toast';
import { Search, Briefcase, MapPin, Building2, Bookmark, BookmarkCheck, ChevronDown, Sparkles, ExternalLink, Filter, X } from 'lucide-react';
import { AnimeReveal, AnimeTilt } from '../../components/shared/AnimeMotion';
import { ScrollyContainer, ScrollyScene } from '../../components/shared/Scrollytelling';

export default function JobMatchingPage() {
    const [companies, setCompanies] = useState(recommendedCompanies);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [domainFilter, setDomainFilter] = useState('all');
    const { addToast } = useToast();

    React.useEffect(() => {
        if (!selectedCompany) return;
        const handleEsc = (e) => { if (e.key === 'Escape') setSelectedCompany(null); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [selectedCompany]);

    const filtered = companies.filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDomain = domainFilter === 'all' || c.domain === domainFilter;
        return matchesSearch && matchesDomain;
    });

    const toggleBookmark = (id) => {
        setCompanies((prev) => prev.map((c) => c.id === id ? { ...c, bookmarked: !c.bookmarked } : c));
        addToast({ type: 'success', message: 'Bookmark updated' });
    };

    const getScoreColor = (score) => {
        if (score >= 85) return 'hsl(var(--success))';
        if (score >= 70) return 'hsl(var(--primary))';
        if (score >= 50) return 'hsl(var(--warning))';
        return 'hsl(var(--destructive))';
    };

    return (
        <div className="space-y-10">
            {/* Context Header */}
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <AnimeReveal preset="slideRight">
                    <div>
                        <h1 className="text-4xl font-black text-white italic tracking-tighter flex items-center gap-4">
                            <Briefcase className="w-8 h-8 text-primary" />
                            Job Matching
                        </h1>
                        <p className="text-muted-foreground mt-2 font-medium">AI-powered sectoral analysis for your specific profile</p>
                    </div>
                </AnimeReveal>
            </header>

            <AnimeReveal preset="fadeUp" delay={200}>
                <AIInsightCard type="suggestion" title="Top Neural Match" confidence={92}>
                    <p className="text-sm font-medium leading-relaxed">
                        <span className="text-white font-bold">Google India</span> has the highest match score at 92%. Your DSA and React skills differentiate you from <span className="text-primary font-bold">84% of candidates</span> in this pool.
                    </p>
                </AIInsightCard>
            </AnimeReveal>

            {/* Cinematic Controls */}
            <AnimeReveal preset="fadeUp" delay={400} className="flex flex-col sm:flex-row gap-4 p-4 bg-white/5 border border-white/5 rounded-[2rem] backdrop-blur-md">
                <div className="flex-1 relative">
                    <Input
                        placeholder="Search neural network for roles..."
                        icon={<Search className="w-4 h-4 text-primary" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 rounded-2xl border-none bg-transparent"
                    />
                </div>
                <Select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} className="w-full sm:w-56 h-12 rounded-2xl bg-white/5 border-none">
                    <option value="all">All Sectors</option>
                    <option value="Technology">Technology</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Software">Software</option>
                    <option value="Transportation">Transportation</option>
                </Select>
            </AnimeReveal>

            {/* 3D Scrollytelling Job Grid */}
            <ScrollyContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filtered.map((company, idx) => (
                        <ScrollyScene key={company.id} className="h-full">
                            <AnimeTilt className="h-full">
                                <Card
                                    className="bg-card/40 border-border hover:bg-card/60 transition-all cursor-pointer group rounded-[2rem] overflow-hidden group"
                                    onClick={() => setSelectedCompany(company)}
                                >
                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-black text-2xl text-white shadow-xl">
                                                    {company.name.slice(0, 2)}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-white italic tracking-tight group-hover:text-primary transition-colors">{company.name}</h3>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{company.role}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleBookmark(company.id); }}
                                                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                            >
                                                {company.bookmarked ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5 text-muted-foreground" />}
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                <Building2 className="w-4 h-4 text-primary/60" /> {company.domain}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                <MapPin className="w-4 h-4 text-primary/60" /> {company.location}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-8">
                                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                                <span className="text-muted-foreground">Match Probability</span>
                                                <span style={{ color: getScoreColor(company.matchScore) }}>{company.matchScore}%</span>
                                            </div>
                                            <Progress value={company.matchScore} className="h-1.5" />
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {company.requirements.map((req) => (
                                                <Badge key={req} variant="secondary" className="bg-white/5 text-[9px] font-bold uppercase tracking-widest border-white/5">{req}</Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <span className="text-2xl font-black text-white italic tracking-tighter">{company.package}</span>
                                            <Button className="h-12 px-8 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                                                Apply Now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimeTilt>
                        </ScrollyScene>
                    ))}
                </div>
            </ScrollyContainer>

            {/* Company Detail Modal (Refactored with Anime) */}
            {selectedCompany && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCompany(null)} />
                    <AnimeReveal preset="zoomIn" className="relative bg-card border border-border p-10 rounded-[3rem] max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                        <button onClick={() => setSelectedCompany(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"><X className="w-6 h-6" /></button>

                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center font-black text-4xl text-white shadow-2xl shadow-primary/20">{selectedCompany.name.slice(0, 2)}</div>
                            <div>
                                <h2 className="text-4xl font-black text-white italic tracking-tighter">{selectedCompany.name}</h2>
                                <p className="text-lg font-medium text-muted-foreground">{selectedCompany.role} • {selectedCompany.location}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Neural Match Score</p>
                                    <p className="text-5xl font-black italic text-primary">{selectedCompany.matchScore}%</p>
                                </div>
                                <Sparkles className="w-12 h-12 text-primary/20" />
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary" /> Why you match
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedCompany.reasons.map((reason, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-card border border-border flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            <span className="text-xs font-medium text-muted-foreground leading-relaxed">{reason}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { l: 'Package', v: selectedCompany.package },
                                    { l: 'Domain', v: selectedCompany.domain },
                                    { l: 'Waitlist', v: selectedCompany.openPositions },
                                    { l: 'Deadline', v: '12 Feb' }
                                ].map((x, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">{x.l}</p>
                                        <p className="text-sm font-black text-white italic">{x.v}</p>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full h-16 rounded-[2rem] text-lg font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30">
                                Initiate Application Process
                            </Button>
                        </div>
                    </AnimeReveal>
                </div>
            )}
        </div>
    );
}
