import { useMediaQuery } from '@uidotdev/usehooks';

export const useIsDesktop = () => {
    return useMediaQuery('only screen and (min-width : 1024px)');
};
