import { useEffect, useState, useRef } from 'react';

export const useMatchMedia = (matchMediaQuery): boolean => {
  const [toggleChange, setToggleChange] = useState<boolean>(false);
  const matchMediaRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    matchMediaRef.current = window.matchMedia(matchMediaQuery);
    const initialMatch = matchMediaRef.current.matches;

    if (initialMatch) {
      setToggleChange(true);
    } else {
      setToggleChange(false);
    }

    const test = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setToggleChange(true);
      } else {
        setToggleChange(false);
      }
    };

    matchMediaRef.current.addListener(test);

    return () => {
      matchMediaRef.current.removeListener(test);
    };
  }, [matchMediaQuery]);

  return toggleChange;
};
