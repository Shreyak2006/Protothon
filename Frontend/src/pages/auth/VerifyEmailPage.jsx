import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle2, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

export default function VerifyEmailPage() {
    const [verifying, setVerifying] = useState(true);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email') || 'student@university.edu';

    useEffect(() => {
        // Simulate email verification
        const timer = setTimeout(() => {
            setVerifying(false);
            setSuccess(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#06080F] px-6">
            <div className="max-w-md w-full text-center">
                <AnimatePresence mode="wait">
                    {verifying ? (
                        <motion.div
                            key="verifying"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="space-y-8"
                        >
                            <div className="relative w-24 h-24 mx-auto">
                                <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping" />
                                <div className="relative w-full h-full rounded-3xl bg-card border border-primary/30 flex items-center justify-center">
                                    <Mail className="w-10 h-10 text-primary animate-bounce" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-extrabold text-white">Verifying Identity</h1>
                                <p className="text-muted-foreground">Please wait while we secure your account...</p>
                            </div>
                            <div className="flex justify-center gap-2">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-extrabold text-white">Verified Successfully!</h1>
                                <p className="text-muted-foreground leading-relaxed">
                                    Awesome! Your email <span className="text-white font-bold">{email}</span> has been verified. You're all set to explore.
                                </p>
                            </div>
                            <Button onClick={() => navigate('/onboarding')} className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/40 group">
                                Start Onboarding <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

import { AnimatePresence } from 'framer-motion';
