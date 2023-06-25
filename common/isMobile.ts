import { useWindowSize } from 'common/use-window-size';

export const checkIsMobile = (innerWidth) => innerWidth < 1150;

export const useIsMobile = () => {
    const windowSize = useWindowSize();

    return checkIsMobile(windowSize.innerWidth);
};
