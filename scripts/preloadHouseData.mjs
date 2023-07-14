import fs from 'fs';
import meta from '../public/house-meta.json' assert { type: 'json' };

const AGE_FILTERS_DATA = [
    { from: 1723, to: 1860 },
    { from: 1860, to: 1917 },
    { from: 1917, to: 1930 },
    { from: 1930, to: 1940 },
    { from: 1940, to: 1955 },
    { from: 1955, to: 1991 },
    { from: 1991, to: 2010 },
    { from: 2010, to: new Date().getFullYear() },
];

const FLOOR_FILTERS_DATA = [
    { from: 1, to: 3 },
    { from: 3, to: 5 },
    { from: 5, to: 9 },
    { from: 9, to: 12 },
    { from: 12, to: 16 },
    { from: 16, to: 21 },
    { from: 21, to: 25 },
    { from: 25, to: 31 },
    { from: 31, to: 52 },
];

const WEAR_TEAR_FILTERS_DATA = [
    { from: 1, to: 10 },
    { from: 10, to: 20 },
    { from: 20, to: 30 },
    { from: 30, to: 40 },
    { from: 40, to: 50 },
    { from: 50, to: 60 },
    { from: 60, to: 70 },
    { from: 70, to: 80 },
    { from: 80, to: 90 },
    { from: 90, to: 100 },
];

const byYear = AGE_FILTERS_DATA.map((range) => {
    Object.entries(meta.years).map(([year, value]) => {
        if (year >= range.from && year < range.to) {
            range.count = range.count || 0;
            range.count += value;
        }
    });

    return range;
});

const byFloor = FLOOR_FILTERS_DATA.map((range) => {
    Object.entries(meta.levels).map(([year, value]) => {
        if (year >= range.from && year < range.to) {
            range.count = range.count || 0;
            range.count += value;
        }
    });

    return range;
});

const byHealth = WEAR_TEAR_FILTERS_DATA.map((range) => {
    Object.entries(meta.health).map(([year, value]) => {
        if (year >= range.from && year < range.to) {
            range.count = range.count || 0;
            range.count += value;
        }
    });

    return range;
});

// old
// {
//     "years": [0, 8, 67, 195, 982, 4790, 935, 811],
//     "levels": [1815, 994, 2400, 1384, 440, 569, 61, 184, 17],
//     "health": [850, 1191, 1467, 1087, 767, 409, 291, 67, 4, 7]
//   }

// new
fs.writeFileSync(
    '../public/houses-meta.json',
    JSON.stringify({
        years: byYear.map((range) => range.count),
        levels: byFloor.map((range) => range.count),
        health: byHealth.map((range) => range.count),
    }),
);
