import { HistogramDataWithoutValues } from 'shared/UI/RangeHistogram';

export enum HouseSourceType {
    Year = 'Year',
    Floors = 'Floors',
    WearAndTear = 'WearAndTear',
}

export const AGE_FILTERS_DATA: HistogramDataWithoutValues = [
    { from: 1723, to: 1860, color: '#ff7461' },
    { from: 1860, to: 1917, color: '#ffA34e' },
    { from: 1917, to: 1930, color: '#fee678' },
    { from: 1930, to: 1940, color: '#85e634' },
    { from: 1940, to: 1955, color: '#0f9467' },
    { from: 1955, to: 1991, color: '#71b3ff' },
    { from: 1991, to: 2010, color: '#c270ff' },
    { from: 2010, to: new Date().getFullYear(), color: '#f97bcf' },
];

export const FLOOR_FILTERS_DATA: HistogramDataWithoutValues = [
    { from: 1, to: 3, color: '#0050f0' },
    { from: 3, to: 5, color: '#0074e5' },
    { from: 5, to: 9, color: '#0095ce' },
    { from: 9, to: 12, color: '#00b49e' },
    { from: 12, to: 16, color: '#5dca13' },
    { from: 16, to: 21, color: '#93d800' },
    { from: 21, to: 25, color: '#b9e500' },
    { from: 25, to: 31, color: '#dcf300' },
    { from: 31, to: 52, color: '#ffff00' },
];

export const WEAR_TEAR_FILTERS_DATA: HistogramDataWithoutValues = [
    { from: 0, to: 10, color: '#006b29' },
    { from: 10, to: 20, color: '#24782a' },
    { from: 20, to: 30, color: '#73a426' },
    { from: 30, to: 40, color: '#b6c718' },
    { from: 40, to: 50, color: '#e9e005' },
    { from: 50, to: 60, color: '#ffea00' },
    { from: 60, to: 70, color: '#ffdc00' },
    { from: 70, to: 80, color: '#ffbb00' },
    { from: 80, to: 90, color: '#ff8a00' },
    { from: 90, to: 100, color: '#ff0000' },
];
