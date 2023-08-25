import { useMatchMedia } from './use-match-media';

export const MAX_MOBILE_WIDTH = 1024;

export const useIsMobile = () => useMatchMedia(`(max-width: ${MAX_MOBILE_WIDTH}px)`);
