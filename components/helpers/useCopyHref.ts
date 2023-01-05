/* eslint-disable */

import { useEffect, useState } from 'react';
import { copy } from './copy';

export function useCopyHref(memo) {
    const [isCopied, setCopied] = useState(false);

    // reset on chamge "memo"
    useEffect(() => setCopied(false), [memo]);

    return {
        isCopied,
        onCopy: () => {
            copy(window.location.href);
            setCopied(true);
        },
    };
}
