import { useState, useEffect, useCallback, useRef } from 'react';

export function useMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
    );
    const timeoutRef = useRef(null);

    const handleResize = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsMobile(window.innerWidth < breakpoint);
        }, 150);
    }, [breakpoint]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [handleResize]);

    return isMobile;
}
