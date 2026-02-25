import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#06080F] px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg w-full text-center"
            >
                <div className="relative mb-10">
                    <div className="w-32 h-32 rounded-[3rem] bg-rose-500/10 flex items-center justify-center mx-auto border border-rose-500/20 relative z-10">
                        <ShieldAlert className="w-16 h-16 text-rose-500" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/5 blur-[80px] rounded-full" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-[25%] opacity-20"
                    >
                        <Lock className="w-6 h-6 text-rose-500" />
                    </motion.div>
                </div>

                <div className="space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        Status Code: 403
                    </div>
                    <h1 className="text-5xl font-black text-white italic tracking-tighter">Access Denied</h1>
                    <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
                        Security breach prevented. You don't have the required administrative clearance to access this sector.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="h-14 rounded-2xl px-10 border-white/10 text-xs font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
                    </Button>
                    <Button
                        onClick={() => navigate('/')}
                        className="h-14 rounded-2xl px-10 text-xs font-bold uppercase tracking-widest shadow-2xl shadow-primary/20"
                    >
                        <Home className="mr-2 w-4 h-4" /> Return Home
                    </Button>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-1 opacity-40">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">Sentinel Security Node</p>
                    <p className="text-[9px] font-mono text-muted-foreground">LOG_EVENT: UNAUTHORIZED_ACCESS_ATTEMPT_V4</p>
                </div>
            </motion.div>
        </div>
    );
}
