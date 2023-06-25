import { useState, useLayoutEffect } from 'react';

export function useWindowSize() {
    const [size, setSize] = useState({
        innerWidth: null,
        innerHeight: null,
    });

    useLayoutEffect(() => {
        const handleResize = () => {
            setSize({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return size;
}
