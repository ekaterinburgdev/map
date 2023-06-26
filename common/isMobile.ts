import { useMatchMedia } from 'common/use-match-media';

export const MAX_MOBILE_WIDTH = 1150;

export const checkIsMobile = (innerWidth) => innerWidth < MAX_MOBILE_WIDTH;

export const useIsMobile = () => useMatchMedia(`(max-width: ${MAX_MOBILE_WIDTH}px)`);
