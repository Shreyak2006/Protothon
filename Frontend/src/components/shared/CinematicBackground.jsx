import React from 'react';
import { motion } from 'framer-motion';

export default function CinematicBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
            {/* Pulsing Gradient Blobs via Framer Motion */}
            <motion.div
                animate={{
                    translateX: [0, 50, -30, 0],
                    translateY: [0, -50, 40, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full"
            />
            <motion.div
                animate={{
                    translateX: [0, -40, 60, 0],
                    translateY: [0, 80, -30, 0],
                    scale: [1, 1.1, 1.3, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full"
            />
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"
            />

            {/* Ambient Particle System */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "100%",
                        opacity: 0
                    }}
                    animate={{
                        y: "-10%",
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                    className="absolute w-1 h-1 bg-primary/20 rounded-full"
                />
            ))}
        </div>
    );
}
