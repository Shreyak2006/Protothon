import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/SharedUI';
import AIInsightCard from '../../components/shared/AIInsightCard';
import { candidatePool, jobPostings } from '../../data/mockData';
import { Building2, Search, Filter, Download, Users, Eye, Star, ChevronDown, X, Sparkles } from 'lucide-react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const statusColors = { applied: 'secondary', shortlisted: 'warning', interview: 'ai', offer: 'success', rejected: 'destructive' };

export default function RecruiterPortalPage() {
    const [activeTab, setActiveTab] = useState('candidates');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    React.useEffect(() => {
        if (!selectedCandidate) return;
        const handleEsc = (e) => { if (e.key === 'Escape') setSelectedCandidate(null); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [selectedCandidate]);

    const filteredCandidates = useMemo(() =>
        candidatePool.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        [searchQuery]);

    const activePostings = useMemo(() => jobPostings, []);

    const tabs = [
        { label: 'Candidates', value: 'candidates', count: candidatePool.length },
        { label: 'Job Postings', value: 'postings', count: jobPostings.length },
    ];



    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item}>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-[hsl(var(--primary))]" /> Recruiter Portal
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] mt-1">Manage candidates and job postings</p>
            </motion.div>

            <motion.div variants={item}>
                <AIInsightCard type="suggestion" title="AI Shortlist Ready" confidence={88}>
                    Based on your job requirements, 6 candidates have been auto-scored. Top candidate: Aisha Khan (96% match).
                </AIInsightCard>
            </motion.div>

            <motion.div variants={item}>
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </motion.div>

            {activeTab === 'candidates' && (
                <>
                    <motion.div variants={item} className="flex gap-3">
                        <Input placeholder="Search candidates or skills..." icon={<Search className="w-4 h-4" />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1" />
                        <Button variant="outline"><Filter className="w-4 h-4" /> Filters</Button>
                        <Button variant="outline"><Download className="w-4 h-4" /> Export</Button>
                    </motion.div>

                    <motion.div variants={item}>
                        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[hsl(var(--secondary))]">
                                            <th className="text-left p-3 font-medium">Candidate</th>
                                            <th className="text-left p-3 font-medium">Dept</th>
                                            <th className="text-left p-3 font-medium">CGPA</th>
                                            <th className="text-left p-3 font-medium">Match</th>
                                            <th className="text-left p-3 font-medium">Skills</th>
                                            <th className="text-left p-3 font-medium">Status</th>
                                            <th className="text-left p-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCandidates.map((c) => (
                                            <tr key={c.id} className="border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary)/0.5)] transition-colors">
                                                <td className="p-3">
                                                    <p className="font-medium">{c.name}</p>
                                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{c.appliedRole}</p>
                                                </td>
                                                <td className="p-3">{c.department}</td>
                                                <td className="p-3 font-medium">{c.cgpa}</td>
                                                <td className="p-3">
                                                    <span className="font-bold" style={{ color: c.matchScore >= 85 ? 'hsl(var(--success))' : c.matchScore >= 70 ? 'hsl(var(--primary))' : 'hsl(var(--warning))' }}>
                                                        {c.matchScore}%
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex flex-wrap gap-1">
                                                        {c.skills.slice(0, 2).map((s) => (<Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>))}
                                                        {c.skills.length > 2 && <Badge variant="secondary" className="text-[10px]">+{c.skills.length - 2}</Badge>}
                                                    </div>
                                                </td>
                                                <td className="p-3"><Badge variant={statusColors[c.status]}>{c.status}</Badge></td>
                                                <td className="p-3">
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedCandidate(c)}>
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}

            {activeTab === 'postings' && (
                <motion.div variants={item} className="space-y-4">
                    {jobPostings.map((jp) => (
                        <Card key={jp.id} hover>
                            <CardContent className="p-5 flex items-center gap-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{jp.role}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{jp.company} • {jp.location}</p>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="text-center"><p className="font-bold">{jp.applicants}</p><p className="text-xs text-[hsl(var(--muted-foreground))]">Applicants</p></div>
                                    <div className="text-center"><p className="font-bold text-[hsl(var(--success))]">{jp.shortlisted}</p><p className="text-xs text-[hsl(var(--muted-foreground))]">Shortlisted</p></div>
                                    <Badge variant="secondary">{jp.package}</Badge>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button className="w-full" variant="outline">+ Post New Role</Button>
                </motion.div>
            )}

            {/* Candidate Modal */}
            {selectedCandidate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCandidate(null)} />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} role="dialog" aria-modal="true" aria-label={`${selectedCandidate.name} profile`} className="relative bg-[hsl(var(--card))] rounded-2xl shadow-2xl border border-[hsl(var(--border))] p-6 max-w-md w-full mx-4">
                        <button onClick={() => setSelectedCandidate(null)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[hsl(var(--secondary))] cursor-pointer"><X className="w-5 h-5" /></button>
                        <h2 className="text-xl font-bold mb-1">{selectedCandidate.name}</h2>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{selectedCandidate.department} • {selectedCandidate.appliedRole}</p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-[hsl(var(--secondary))]"><p className="text-xs text-[hsl(var(--muted-foreground))]">CGPA</p><p className="font-bold">{selectedCandidate.cgpa}</p></div>
                            <div className="p-3 rounded-xl bg-[hsl(var(--secondary))]"><p className="text-xs text-[hsl(var(--muted-foreground))]">Match</p><p className="font-bold text-[hsl(var(--primary))]">{selectedCandidate.matchScore}%</p></div>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Skills</p>
                            <div className="flex flex-wrap gap-1.5">{selectedCandidate.skills.map((s) => (<Badge key={s} variant="secondary">{s}</Badge>))}</div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1">Reject</Button>
                            <Button className="flex-1"><Sparkles className="w-4 h-4" /> Shortlist</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
