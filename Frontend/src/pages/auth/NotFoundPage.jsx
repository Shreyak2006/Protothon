import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Search, Map, Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#06080F] px-6 overflow-hidden">
            <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.03]">
                <div className="text-[30vw] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">404</div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center relative z-10"
            >
                <div className="mb-12 relative h-32 flex items-center justify-center">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Compass className="w-24 h-24 text-primary" />
                    </motion.div>
                </div>

                <div className="space-y-4 mb-12">
                    <h1 className="text-4xl font-black text-white italic tracking-tighter">Lost in Space</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        The resource you are looking for has drifted beyond the event horizon. It's either deleted or never existed.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        onClick={() => navigate('/dashboard')}
                        className="h-14 rounded-2xl text-md font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20"
                    >
                        <Home className="mr-3 w-5 h-5" /> Back to Dashboard
                    </Button>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground justify-center uppercase tracking-widest pt-4">
                        <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/login')}>Login</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
