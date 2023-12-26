import { useMatchMedia } from './useMatchMedia';

const DESKTOP_WIDTH_MIN = 1024;

export const useIsDesktop = () => useMatchMedia(`(min-width: ${DESKTOP_WIDTH_MIN}px)`);
