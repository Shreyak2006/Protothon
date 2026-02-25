import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Timer,
    CheckCircle2,
    AlertCircle,
    Bookmark,
    ListFilter,
    HelpCircle,
    Flag
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { cn } from '../../lib/utils';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_QUESTIONS = [
    {
        id: 1,
        text: "Which of the following data structures follows the LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Binary Tree"],
        type: "mcq"
    },
    {
        id: 2,
        text: "What is the time complexity of searching for an element in a balanced Binary Search Tree?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        type: "mcq"
    },
    {
        id: 3,
        text: "Explain the difference between a Process and a Thread in operating systems.",
        type: "subjective"
    }
];

export default function TestPlayerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [marked, setMarked] = useState([]);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
    const [showConfirm, setShowConfirm] = useState(false);

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

    const handleAnswer = (option) => {
        setAnswers({ ...answers, [currentQuestion]: option });
    };

    const toggleMark = () => {
        if (marked.includes(currentQuestion)) {
            setMarked(marked.filter(i => i !== currentQuestion));
        } else {
            setMarked([...marked, currentQuestion]);
        }
    };

    const progress = ((Object.keys(answers).length) / MOCK_QUESTIONS.length) * 100;

    return (
        <div className="h-screen bg-[#06080F] flex flex-col text-white overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-card/30 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <HelpCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-bold text-sm tracking-tight text-white">Fullstack Engineering Core</h1>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Technical Assessment Round</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden md:block w-48">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                    </div>
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300",
                        timeLeft < 300 ? "bg-rose-500/10 border-rose-500/50 text-rose-500 animate-pulse" : "bg-white/5 border-white/10 text-muted-foreground"
                    )}>
                        <Timer className="w-4 h-4" />
                        <span className="font-mono text-sm font-bold">{formatTime(timeLeft)}</span>
                    </div>
                    <Button onClick={() => setShowConfirm(true)} className="h-10 rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
                        Submit Test
                    </Button>
                </div>
            </header>

            {/* Main Layout */}
            <main className="flex-1 flex overflow-hidden">
                {/* Right Panel — Question Navigation Sidebar */}
                <div className="w-72 border-r border-white/10 bg-card/10 flex flex-col shrink-0">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                            <ListFilter className="w-3 h-3" /> Question Palette
                        </h3>
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-2 overflow-y-auto">
                        {MOCK_QUESTIONS.map((q, i) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestion(i)}
                                className={cn(
                                    "w-12 h-12 rounded-xl text-xs font-bold transition-all border shrink-0",
                                    currentQuestion === i ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" :
                                        answers[i] ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                                            marked.includes(i) ? "bg-purple-500/10 border-purple-500/30 text-purple-500" :
                                                "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <div className="mt-auto p-4 border-t border-white/10 bg-white/5 grid grid-cols-2 gap-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Answered</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /> Review</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Current</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/10" /> Visited</div>
                    </div>
                </div>

                {/* Center Content — Question Display */}
                <div className="flex-1 overflow-y-auto bg-[#0d0f1a] relative flex flex-col shadow-inner">
                    <div className="max-w-3xl w-full mx-auto p-12 space-y-12">
                        {/* Question Header */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-extrabold rounded-full uppercase tracking-[0.2em]">
                                    Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}
                                </span>
                                <button
                                    onClick={toggleMark}
                                    className={cn(
                                        "flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-all",
                                        marked.includes(currentQuestion) ? "bg-purple-500/20 text-purple-500" : "text-muted-foreground hover:bg-white/5"
                                    )}
                                >
                                    <Flag className={cn("w-4 h-4", marked.includes(currentQuestion) && "fill-current")} />
                                    Mark for Review
                                </button>
                            </div>
                            <h2 className="text-2xl font-semibold leading-relaxed text-white/90">
                                {MOCK_QUESTIONS[currentQuestion].text}
                            </h2>
                        </div>

                        {/* Options Section */}
                        <div className="space-y-4">
                            {MOCK_QUESTIONS[currentQuestion].type === 'mcq' ? (
                                <div className="grid grid-cols-1 gap-3">
                                    {MOCK_QUESTIONS[currentQuestion].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(option)}
                                            className={cn(
                                                "group flex items-center p-5 rounded-2xl border transition-all text-left",
                                                answers[currentQuestion] === option
                                                    ? "bg-primary/10 border-primary ring-1 ring-primary shadow-xl shadow-primary/10"
                                                    : "bg-white/5 border-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl border-2 flex items-center justify-center mr-5 transition-all",
                                                answers[currentQuestion] === option
                                                    ? "bg-primary border-primary text-white"
                                                    : "border-white/20 text-muted-foreground group-hover:border-white/40"
                                            )}>
                                                <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                                            </div>
                                            <span className={cn(
                                                "font-semibold text-lg",
                                                answers[currentQuestion] === option ? "text-white" : "text-muted-foreground"
                                            )}>{option}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-muted/20 border border-border rounded-2xl">
                                        <textarea
                                            className="w-full h-64 bg-transparent focus:outline-none text-white resize-none leading-relaxed"
                                            placeholder="Write your explanation here..."
                                            value={answers[currentQuestion] || ''}
                                            onChange={(e) => handleAnswer(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground text-right uppercase tracking-widest font-bold">Characters Left: 2000</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Nav Controls */}
                    <div className="mt-auto h-20 border-t border-white/10 px-12 flex items-center justify-between bg-card/20 backdrop-blur-xl">
                        <Button
                            variant="outline"
                            disabled={currentQuestion === 0}
                            onClick={() => setCurrentQuestion(prev => prev - 1)}
                            className="h-12 rounded-xl px-6 border-white/10"
                        >
                            <ChevronLeft className="mr-2 w-4 h-4" /> Previous Question
                        </Button>

                        <div className="flex gap-4">
                            <span className="hidden lg:flex items-center gap-2 text-xs font-bold text-muted-foreground px-4 bg-white/5 rounded-xl border border-white/10">
                                <AlertCircle className="w-4 h-4 text-primary" />
                                Changes are saved automatically
                            </span>

                            {currentQuestion < MOCK_QUESTIONS.length - 1 ? (
                                <Button
                                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                                    className="h-12 rounded-xl px-8"
                                >
                                    Next Question <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setShowConfirm(true)}
                                    className="h-12 rounded-xl px-10 bg-emerald-600 hover:bg-emerald-700"
                                >
                                    Submit Final Test <CheckCircle2 className="ml-2 w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Submit Confirmation Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setShowConfirm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-card border border-border p-10 rounded-[2.5rem] max-w-lg w-full shadow-2xl overflow-hidden"
                        >
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px] rounded-full" />

                            <div className="text-center space-y-6">
                                <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center mx-auto border border-emerald-500/30">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-extrabold text-white">Ready to Finish?</h2>
                                    <p className="text-muted-foreground">
                                        You have answered <span className="text-white font-bold">{Object.keys(answers).length}</span> out of <span className="text-white font-bold">{MOCK_QUESTIONS.length}</span> questions.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <Button variant="outline" className="h-14 rounded-2xl" onClick={() => setShowConfirm(false)}>
                                        Continue Test
                                    </Button>
                                    <Button className="h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20" onClick={() => navigate('/assessments')}>
                                        Submit Now
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">You cannot undo this action after final submission.</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
