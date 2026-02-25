import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input, Label } from '../../components/ui/Input';
import { Lock, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#06080F] px-6">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-3">Reset Password</h2>
                    <p className="text-muted-foreground">Secure your account with a new master key.</p>
                </div>

                <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    {!success ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        className="pl-10 h-12 rounded-xl bg-muted/30"
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Confirm New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        className="pl-10 h-12 rounded-xl bg-muted/30"
                                        placeholder="••••••••"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-muted/20 rounded-2xl space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { label: '8+ Characters', met: formData.password.length >= 8 },
                                        { label: 'Match', met: formData.password && formData.password === formData.confirmPassword }
                                    ].map(req => (
                                        <div key={req.label} className="flex items-center gap-2">
                                            <div className={cn("w-1.5 h-1.5 rounded-full", req.met ? "bg-emerald-500" : "bg-muted-foreground/30")} />
                                            <span className={cn("text-[10px] font-bold uppercase tracking-widest", req.met ? "text-emerald-500" : "text-muted-foreground")}>{req.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button type="submit" loading={loading} className="w-full h-14 rounded-2xl font-bold text-md shadow-lg shadow-primary/20">
                                Update Password
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-black text-white italic mb-2">Password Updated!</h3>
                            <p className="text-muted-foreground text-sm mb-8">
                                Your login credentials have been successfully updated. You can now access your portal.
                            </p>
                            <Button
                                onClick={() => navigate('/login')}
                                className="w-full h-14 rounded-2xl font-bold bg-white text-black hover:bg-primary hover:text-white group"
                            >
                                Continue To Login <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
