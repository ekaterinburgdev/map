import { useEffect, useState } from 'react';
import { copy } from './copy';

export function useCopyHref(memo: string, resetTimeout?: number) {
  const [isCopied, setCopied] = useState(false);

  // reset on chamge "memo"
  useEffect(() => setCopied(false), [memo]);

  return {
    isCopied,
    onCopy: () => {
      copy(memo);
      setCopied(true);

      if (!resetTimeout) {
        return;
      }

      setTimeout(() => {
        setCopied(false);
      }, resetTimeout);
    },
  };
}
