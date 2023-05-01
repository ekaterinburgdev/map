import React, { useEffect } from 'react';

interface MutationObserverOptions {
    attributes?: boolean;
    characterData?: boolean;
    childList?: boolean;
    subtree?: boolean;
}

export function useMutationObserver(
    ref: React.RefObject<HTMLElement>,
    callback: MutationCallback,
    options: MutationObserverOptions = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
    },
) {
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (ref.current) {
            const observer = new MutationObserver(callback);
            observer.observe(ref.current, options);

            return () => observer.disconnect();
        }
    }, [callback, options, ref]);

    return null;
}
