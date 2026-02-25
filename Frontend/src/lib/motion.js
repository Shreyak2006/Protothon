import { useRef } from 'react';

/**
 * Common Animation Variants for Framer Motion
 */
export const PRESETS = {
    fadeUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
    zoomIn: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
    },
    slideRight: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

/**
 * 3D Tilt hook (simplified for framer-motion/standard JS)
 */
export const useAnimeTilt = () => {
    // This will be handled by Motion's whileHover for now
    return null;
};
