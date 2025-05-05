import { useState, useEffect } from 'react';

const useScrollVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeoutId;
        
        const getScrollPosition = () => {
            const scrollPosition = {
                isAtTop: window.scrollY <= 5,
                isAtBottom: window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5,
                isScrollingDown: window.scrollY > lastScrollY
            };
            return scrollPosition;
        };

        const controlVisibility = () => {
            const { isAtTop, isAtBottom, isScrollingDown } = getScrollPosition();

            // Handle edge cases first
            if (isAtTop) {
                setIsVisible(true);
            } else if (isAtBottom) {
                setIsVisible(false);
            } else {
                // Normal scroll behavior
                setIsVisible(!isScrollingDown);
            }

            setLastScrollY(window.scrollY);
        };

        const throttledScroll = () => {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    controlVisibility();
                    timeoutId = null;
                }, 150);
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