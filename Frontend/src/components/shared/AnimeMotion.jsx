import React from 'react';
import { motion } from 'framer-motion';

const PRESETS = {
    fadeUp: {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true }
    },
    zoomIn: {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true }
    },
    slideRight: {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true }
    }
};

/**
 * Reusable Reveal component using Framer Motion
 */
export const AnimeReveal = ({
    children,
    preset = 'fadeUp',
    delay = 0,
    cascade = false,
    className = ""
}) => {
    const variant = PRESETS[preset];

    if (cascade) {
        return (
            <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                    initial: {},
                    animate: {
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: delay / 1000
                        }
                    }
                }}
                className={className}
            >
                {React.Children.map(children, (child) => (
                    <motion.div
                        variants={{
                            initial: variant.initial,
                            animate: { ...variant.whileInView, transition: { duration: 0.8 } }
                        }}
                    >
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div
            {...variant}
            transition={{ ...variant.transition, delay: delay / 1000, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * 3D Interactive Card using Framer Motion
 */
export const AnimeTilt = ({ children, className = "" }) => {
    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: -5,
                z: 50
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={className}
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
            <div style={{ transformStyle: 'preserve-3d' }}>
                {children}
            </div>
        </motion.div>
    );
};
