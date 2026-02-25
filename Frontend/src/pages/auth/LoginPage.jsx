import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Input';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('arjun.mehta@university.edu');
    const [password, setPassword] = useState('password123');
    const [role, setRole] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const bubbles = useMemo(() =>
        Array.from({ length: 20 }, () => ({
            size: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.15,
        })),
        []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password, role);
            navigate('/dashboard');
        } catch (err) {
            console.error('[Login] Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel — Branding */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {bubbles.map((bubble, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
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
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 italic">
                        AI-Powered Placement Governance
                    </h1>
                    <p className="text-lg text-white/80 leading-relaxed font-medium">
                        Streamline your campus placements with intelligent matching, skill analytics, and governance tools.
                    </p>
                    <div className="mt-12 flex gap-8">
                        <div>
                            <p className="text-3xl font-black italic">95%</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Placement Rate</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black italic">85+</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Companies</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black italic">₹45L</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Highest CTC</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel — Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-[hsl(var(--background))]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-sm"
                >
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold italic tracking-tight">PlaceAI</span>
                    </div>

                    <h2 className="text-3xl font-black text-white italic tracking-tighter mb-1">Welcome back</h2>
                    <p className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-8">
                        Sign in to your secure placement portal.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selector */}
                        <div className="flex gap-1 p-1 rounded-2xl bg-[hsl(var(--muted)/30)] border border-border">
                            {['student', 'recruiter', 'admin'].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all capitalize cursor-pointer ${role === r
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-[hsl(var(--muted-foreground))] hover:text-white'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Portal Identity (Email)</Label>
                            <Input
                                id="email"
                                type="email"
                                className="h-12 rounded-xl"
                                placeholder="arjun@university.edu"
                                icon={<Mail className="w-4 h-4" />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Security Key</Label>
                                <Link to="/forgot-password" size="sm" className="text-[10px] uppercase font-bold text-primary hover:underline">
                                    Lost Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    className="h-12 rounded-xl pr-10"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    icon={<Lock className="w-4 h-4" />}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-white cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20" disabled={loading}>
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Authorize <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            New to the ecosystem?{' '}
                            <Link to="/signup" className="text-primary hover:underline font-black italic ml-1">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
