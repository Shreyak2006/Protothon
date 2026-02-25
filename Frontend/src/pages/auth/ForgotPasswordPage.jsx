import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Mail, ArrowLeft, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#06080F] px-6">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Forgot Password?</h2>
                    <p className="text-muted-foreground">No worries, we'll send you reset instructions.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                    {/* Decorative subtle border line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            className="pl-10 h-12 rounded-xl bg-muted/30"
                                            placeholder="arjun@university.edu"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button type="submit" loading={loading} className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/20">
                                    Send Reset Link <Send className="ml-2 w-4 h-4" />
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Instructions Sent!</h3>
                                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                                    We've sent a password reset link to <span className="text-white font-medium">{email}</span>. Please check your inbox.
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-12 rounded-xl"
                                    onClick={() => setSubmitted(false)}
                                >
                                    Didn't receive email? Try again
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="text-center mt-8">
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
