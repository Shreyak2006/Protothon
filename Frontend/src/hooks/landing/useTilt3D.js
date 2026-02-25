import { useState, useRef, useCallback, useEffect } from 'react';

export function useTilt3D(intensity = 10) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (-(mouseY / (height / 2)) * intensity).toFixed(2);
        const rotateY = ((mouseX / (width / 2)) * intensity).toFixed(2);

        setTilt({ x: Number(rotateX), y: Number(rotateY) });
    }, [intensity]);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onMouseMove = (e) => {
            if (isHovering) handleMouseMove(e);
        };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [isHovering, handleMouseMove]);

    return {
        ref: containerRef,
        style: {
            transform: isHovering
                ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
            willChange: 'transform'
        }
    };
}
