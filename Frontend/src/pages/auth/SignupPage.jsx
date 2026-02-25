import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import {
    Sparkles,
    Mail,
    Lock,
    User,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Building2,
    GraduationCap,
    Shield
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: '',
        studentId: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const bubbles = useMemo(() =>
        Array.from({ length: 15 }, () => ({
            size: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.1,
        })),
        []);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 1500);
    };

    const roles = [
        { id: 'student', title: 'Student', icon: GraduationCap, desc: 'Seeking internship or full-time opportunities' },
        { id: 'recruiter', title: 'Recruiter', icon: Building2, desc: 'Looking to hire top campus talent' },
        { id: 'admin', title: 'TPO / Admin', icon: Shield, desc: 'Managing university placement operations' }
    ];

    return (
        <div className="min-h-screen flex bg-[#06080F]">
            {/* Left Panel — Branding (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-accent items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0">
                    {bubbles.map((bubble, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white transition-all duration-1000"
                            style={{
                                width: bubble.size,
                                height: bubble.size,
                                left: bubble.left,
                                top: bubble.top,
                                opacity: bubble.opacity,
                            }}
                        />
                    ))}
                </div>
                <div className="relative text-white max-w-md">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-8 border border-white/20">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold mb-6">Join the Future of Campus Hiring</h1>
                    <p className="text-white/80 text-lg leading-relaxed mb-8">
                        The world's first AI-governed placement platform ensuring fairness, transparency, and predictive success for everyone.
                    </p>
                    <div className="space-y-4">
                        {[
                            'AI-Powered Matchmaking',
                            'Automated Policy Enforcement',
                            'Verified Skill Profiles',
                            'Real-time Analytics'
                        ].map(feature => (
                            <div key={feature} className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel — Signup Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-12 relative">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                Step {step} of 3
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h2>
                        <p className="text-muted-foreground">Join thousands of students and recruiters.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <Label className="text-sm font-semibold mb-2 block">Tell us who you are</Label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {roles.map(r => {
                                            const Icon = r.icon;
                                            return (
                                                <button
                                                    key={r.id}
                                                    type="button"
                                                    onClick={() => setRole(r.id)}
                                                    className={cn(
                                                        "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                                                        role === r.id
                                                            ? "bg-primary/10 border-primary ring-1 ring-primary shadow-lg shadow-primary/10"
                                                            : "bg-card border-border hover:border-primary/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-xl flex items-center justify-center",
                                                        role === r.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                                    )}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white">{r.title}</p>
                                                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <Button type="button" onClick={nextStep} className="w-full h-12 rounded-xl mt-6">
                                        Continue <ChevronRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                className="pl-10"
                                                placeholder="Arjun Mehta"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                type="email"
                                                className="pl-10"
                                                placeholder="arjun@university.edu"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{role === 'student' ? 'Student ID / Roll No' : 'Organization Name'}</Label>
                                        <div className="relative">
                                            {role === 'student' ? <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /> : <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
                                            <Input
                                                className="pl-10"
                                                placeholder={role === 'student' ? "e.g. 20BCS1001" : "e.g. Google India"}
                                                value={role === 'student' ? formData.studentId : formData.organization}
                                                onChange={e => setFormData({ ...formData, [role === 'student' ? 'studentId' : 'organization']: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl">
                                            Back
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="flex-[2] h-12 rounded-xl">
                                            Continue <ChevronRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label>Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                type="password"
                                                className="pl-10"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                type="password"
                                                className="pl-10"
                                                placeholder="••••••••"
                                                value={formData.confirmPassword}
                                                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-muted/50 rounded-xl space-y-3 border border-border">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password Requirements</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { label: '8+ Characters', met: formData.password.length >= 8 },
                                                { label: '1 Uppercase', met: /[A-Z]/.test(formData.password) },
                                                { label: '1 Number', met: /[0-9]/.test(formData.password) },
                                                { label: 'Match', met: formData.password && formData.password === formData.confirmPassword }
                                            ].map(req => (
                                                <div key={req.label} className="flex items-center gap-2">
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", req.met ? "bg-emerald-500" : "bg-muted-foreground/30")} />
                                                    <span className={cn("text-[10px]", req.met ? "text-emerald-500 font-medium" : "text-muted-foreground")}>{req.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl">
                                            Back
                                        </Button>
                                        <Button type="submit" loading={loading} className="flex-[2] h-12 rounded-xl">
                                            Create Account
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>

                {/* Footer labels */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                    <span>Securely Encrypted</span>
                    <span>GDPR Compliant</span>
                    <span>Privacy First</span>
                </div>
            </div>
        </div>
    );
}
