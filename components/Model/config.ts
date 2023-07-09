/* eslint-disable no-console */
import { MapItemType } from 'common/types/map-item';

import { DesignCodeCardContent } from './DesignCode/CardContent/CardContent';

import { DTPCardContent } from './DTP/CardContent/CardContent';

import { HousesCardContent } from './Houses/CardContent/CardContent';

import { OKNCardContent } from './OKN/CardContent';

export const MODEL_CONFIG = {
    [MapItemType.Houses]: {
        cardContent: HousesCardContent,
        // mapData: HousesMapData,
        requests: {
            oneItemRequest: console.log,
        },
    },
    [MapItemType.DesignCode]: {
        cardContent: DesignCodeCardContent,
        // mapData: DesignCodeMapData,
        requests: {
            oneItemRequest: console.log,
        },
    },
    [MapItemType.DTP]: {
        cardContent: DTPCardContent,
        // mapData: DTPMapData,
        requests: {
            oneItemRequest: console.log,
        },
    },
    [MapItemType.OKN]: {
        cardContent: OKNCardContent,
        // mapData: OKNMapData,
        requests: {
            oneItemRequest: console.log,
        },
    },
    [MapItemType.Lines]: {
        cardContent: () => null,
        // mapData: LinesMapData,
        requests: {
            oneItemRequest: () => Promise.resolve(),
        },
    },
} as const;
