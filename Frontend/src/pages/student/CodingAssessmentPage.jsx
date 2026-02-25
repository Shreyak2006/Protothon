import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2,
    Play,
    Send,
    ChevronLeft,
    Timer,
    Terminal,
    Settings,
    Maximize2,
    MessageSquare,
    AlertCircle,
    CheckCircle2,
    RefreshCw
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import { useNavigate, useParams } from 'react-router-dom';

export default function CodingAssessmentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('problem');
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [code, setCode] = useState(`function solution(n, arr) {\n  // Write your code here\n  \n  return 0;\n}`);
    const [language, setLanguage] = useState('javascript');
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState(null);

    // Mock Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const runCode = () => {
        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            setOutput({
                status: 'success',
                message: 'All test cases passed!',
                runtime: '45ms',
                memory: '12.4 MB',
                cases: [
                    { id: 1, name: 'Sample Case 1', status: 'passed' },
                    { id: 2, name: 'Sample Case 2', status: 'passed' },
                    { id: 3, name: 'Hidden Case 1', status: 'passed' }
                ]
            });
        }, 2000);
    };

    const submitSolution = () => {
        // Confirm submission logic
        navigate('/assessments');
    };

    return (
        <div className="h-screen bg-[#06080F] flex flex-col text-white overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-card/30 backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Code2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-bold text-sm tracking-tight">System Design Assessment</h1>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Question 1 of 3 • Array Manipulation</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300",
                        timeLeft < 300 ? "bg-rose-500/10 border-rose-500/50 text-rose-500 animate-pulse" : "bg-white/5 border-white/10 text-muted-foreground"
                    )}>
                        <Timer className="w-4 h-4" />
                        <span className="font-mono text-sm font-bold">{formatTime(timeLeft)}</span>
                    </div>
                    <Button onClick={submitSolution} className="h-10 rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
                        Finish & Submit
                    </Button>
                </div>
            </header>

            {/* Main Editor Interface */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Side: Problem Description */}
                <div className="w-1/3 border-r border-white/10 flex flex-col bg-card/20">
                    <div className="flex p-2 gap-2 border-b border-white/10 overflow-x-auto">
                        {['problem', 'submissions', 'hints', 'discussion'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all",
                                    activeTab === tab ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">1. Minimum Path Sum</h2>
                                <Badge variant="outline" className="text-[10px] uppercase font-bold text-amber-500 border-amber-500/30">Medium</Badge>
                            </div>
                            <div className="prose prose-invert prose-sm">
                                <p>Given a <code>m x n</code> grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.</p>
                                <p><strong>Note:</strong> You can only move either down or right at any point in time.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary" />
                                Examples
                            </h3>
                            <div className="bg-white/5 rounded-xl p-4 space-y-4 border border-white/10">
                                <div>
                                    <p className="text-[10px] uppercase text-muted-foreground font-bold mb-2 tracking-widest">Input</p>
                                    <pre className="text-xs bg-black/40 p-3 rounded-lg border border-white/5">grid = [[1,3,1],[1,5,1],[4,2,1]]</pre>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-muted-foreground font-bold mb-2 tracking-widest">Output</p>
                                    <pre className="text-xs bg-black/40 p-3 rounded-lg border border-white/5">7</pre>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-muted-foreground font-bold mb-2 tracking-widest">Explanation</p>
                                    <p className="text-xs text-muted-foreground">Because the path 1→3→1→1→1 minimizes the sum.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary" />
                                Constraints
                            </h3>
                            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside bg-white/5 p-4 rounded-xl border border-white/10">
                                <li><code>m == grid.length</code></li>
                                <li><code>n == grid[i].length</code></li>
                                <li><code>1 &lt;= m, n &lt;= 200</code></li>
                                <li><code>0 &lt;= grid[i][j] &lt;= 100</code></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side: Code Editor & Console */}
                <div className="flex-1 flex flex-col bg-[#0d0f1a] relative">
                    {/* Editor Toolbar */}
                    <div className="h-12 border-b border-white/10 px-4 flex items-center justify-between bg-card/10 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <select
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="javascript">JavaScript (Node v18)</option>
                                <option value="python">Python 3.10</option>
                                <option value="java">Java 17</option>
                                <option value="cpp">C++ 14</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground transition-all" title="Settings">
                                <Settings className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground transition-all" title="Full Screen">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Basic Editor Viewport */}
                    <div className="flex-1 relative font-mono text-sm group">
                        <div className="absolute top-0 left-0 w-12 h-full bg-card/20 border-r border-white/5 flex flex-col items-center py-4 text-white/20 select-none">
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} className="h-6 flex items-center justify-center leading-none text-[10px]">{i + 1}</div>
                            ))}
                        </div>
                        <textarea
                            className="absolute top-0 left-12 right-0 bottom-0 bg-transparent p-4 focus:outline-none resize-none leading-6 caret-primary selection:bg-primary/30 scrollbar-hide"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            spellCheck={false}
                        />
                    </div>

                    {/* Console Panel */}
                    <div className={cn(
                        "border-t border-white/10 bg-card/40 backdrop-blur-xl transition-all duration-300",
                        output ? "h-1/3" : "h-12"
                    )}>
                        <div className="h-12 px-4 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                <Terminal className="w-4 h-4" />
                                Console
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest border-white/10 hover:bg-white/5"
                                    onClick={() => setOutput(null)}
                                >
                                    Reset
                                </Button>
                                <Button
                                    loading={isRunning}
                                    onClick={runCode}
                                    className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                                >
                                    <Play className="mr-2 w-3 h-3" /> Run Code
                                </Button>
                            </div>
                        </div>

                        {output && (
                            <div className="p-6 h-[calc(100%-48px)] overflow-y-auto custom-scrollbar">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {output.status === 'success' ? (
                                                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Accepted</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Wrong Answer</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-6 text-[11px] font-semibold text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <span className="uppercase tracking-widest opacity-60">Runtime</span>
                                                <span className="text-white bg-white/5 px-2 py-1 rounded-md">{output.runtime}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="uppercase tracking-widest opacity-60">Memory</span>
                                                <span className="text-white bg-white/5 px-2 py-1 rounded-md">{output.memory}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Test Case Results</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {output.cases.map(c => (
                                                <div key={c.id} className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-muted-foreground">{c.name}</span>
                                                    {c.status === 'passed' ? (
                                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                    ) : (
                                                        <X className="w-3 h-3 text-rose-500" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Anti-cheat Warnings Overlay */}
            <div className="fixed bottom-4 right-6 pointer-events-none space-y-3 z-[100]">
                <div className="bg-card/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Proctoring Active</span>
                </div>
            </div>
        </div>
    );
}
