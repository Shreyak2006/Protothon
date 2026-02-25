import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollyContainer provides a perspective space
 */
export const ScrollyContainer = ({ children }) => {
    return (
        <div style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
};

/**
 * ScrollyScene animates its children based on scroll position using Framer Motion
 */
export const ScrollyScene = ({ children, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Animate depth and scale based on scroll
    const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-400, 0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.9]);

    return (
        <motion.div
            ref={ref}
            style={{
                translateZ,
                opacity,
                scale,
                transformStyle: 'preserve-3d'
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
