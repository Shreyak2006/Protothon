import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, ArrowLeft, RefreshCw, KeyRound } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TwoFactorPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const inputs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#06080F] px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-card border border-border p-10 rounded-3xl shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />

                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-3">Tow-Step Verification</h2>
                    <p className="text-muted-foreground text-sm">We sent a 6-digit code to your registered email. Enter it below to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-between gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={el => inputs.current[index] = el}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                className="w-12 h-14 bg-muted/30 border border-border rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <Button type="submit" loading={loading} disabled={otp.join('').length < 6} className="w-full h-14 rounded-2xl text-lg font-bold">
                            Verify & Continue
                        </Button>

                        <div className="text-center">
                            {timer > 0 ? (
                                <p className="text-xs text-muted-foreground">Resend code in <span className="text-primary font-bold">{timer}s</span></p>
                            ) : (
                                <button type="button" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-2">
                                    <RefreshCw className="w-3 h-3" /> Resend Code
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                <div className="mt-10 pt-8 border-t border-border text-center">
                    <button onClick={() => navigate('/login')} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Use a different method
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
