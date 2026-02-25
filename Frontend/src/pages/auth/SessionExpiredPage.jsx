import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Ghost, LogIn, Clock, AlertCircle } from 'lucide-react';

export default function SessionExpiredPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#06080F] px-6 relative overflow-hidden">
            {/* Dark abstract shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center relative z-10"
            >
                <div className="mb-8 relative">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-red-500/10 flex items-center justify-center mx-auto border border-red-500/20 shadow-2xl shadow-red-500/5">
                        <Clock className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                <div className="space-y-4 mb-10">
                    <h1 className="text-4xl font-black text-white italic tracking-tighter">Session Expired</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        For your security, you were automatically logged out after a period of inactivity.
                    </p>
                </div>

                <div className="bg-card/40 border border-border p-6 rounded-3xl mb-8 flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white uppercase tracking-widest">Active Protection</p>
                        <p className="text-[11px] text-muted-foreground">This helps prevent unauthorized access if you leave your device unattended.</p>
                    </div>
                </div>

                <Button
                    onClick={() => navigate('/login')}
                    className="w-full h-14 rounded-2xl text-lg font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 group"
                >
                    <LogIn className="mr-3 w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Re-Authenticate
                </Button>

                <p className="mt-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                    AI-Governance Security Layer 4.2.1
                </p>
            </motion.div>
        </div>
    );
}
