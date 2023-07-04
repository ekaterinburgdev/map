import { Sizes, TOpenClosed } from './Point.types';

export const SIZE_BY_LETTER: Record<Sizes, TOpenClosed> = {
    [Sizes.XS]: {
        open: 5,
        closed: 5,
    },
    [Sizes.S]: {
        open: 30,
        closed: 20,
    },
    [Sizes.M]: {
        open: 70,
        closed: 40,
    },
};

export const NO_PREVIEW_SIZE: TOpenClosed = {
    open: 30,
    closed: 20,
};
