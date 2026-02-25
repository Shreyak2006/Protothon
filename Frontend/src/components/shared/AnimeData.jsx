import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * Animated Counter using Framer Motion
 */
export const AnimeCounter = ({ value, duration = 2, suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const spring = useSpring(0, { stiffness: 50, damping: 15 });

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
        return unsubscribe;
    }, [spring]);

    return <span>{displayValue}{suffix}</span>;
};

/**
 * Progress Bar Reveal using Framer Motion
 */
export const AnimeProgress = ({ value, className = "", color = "hsl(var(--primary))" }) => {
    return (
        <div className={`h-2 w-full bg-white/5 rounded-full overflow-hidden ${className}`}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="h-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};
