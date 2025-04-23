import { useState, useEffect } from 'react';

const useScrollVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeoutId;
        
        const controlVisibility = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        const throttledScroll = () => {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    controlVisibility();
                    timeoutId = null;
                }, 150); // Throttle to run max every 150ms
            }
        };

        window.addEventListener('scroll', throttledScroll);
        
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [lastScrollY]);

    return isVisible;
};

export default useScrollVisibility; 