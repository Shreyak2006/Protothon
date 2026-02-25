import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimePageTransition({ children }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={window.location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                            ease: "easeOut",
                            staggerChildren: 0.1
                        }
                    },
                    exit: {
                        opacity: 0,
                        y: -20,
                        transition: {
                            duration: 0.3
                        }
                    }
                }}
            >
                {/* Overlay Wipe Effect */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: [0, 1, 0], originX: [0, 0, 1] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 bg-primary z-[9999] pointer-events-none"
                />

                {children}
            </motion.div>
        </AnimatePresence>
    );
}
