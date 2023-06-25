import { useWindowSize } from 'common/use-window-size';

export const MAX_MOBILE_WIDTH = 1150;

export const checkIsMobile = (innerWidth) => innerWidth < MAX_MOBILE_WIDTH;

export const useIsMobile = () => {
    const windowSize = useWindowSize();

    return checkIsMobile(windowSize.innerWidth);
};
