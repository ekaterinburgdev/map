/* eslint-disable no-console */
import { MapItemType } from 'common/types/map-item';
import { designCode } from 'common/data/designCode/designCode';
import { dtp } from 'common/data/dtp/dtp';
import { okn } from 'common/data/okn/okn';

import { DesignCodeCardContent } from './DesignCode/CardContent/CardContent';

import { DTPCardContent } from './DTP/CardContent/CardContent';

import { HousesCardContent } from './Houses/CardContent/CardContent';

import { OKNCardContent } from './OKN/CardContent';

export const MODEL_CONFIG = {
    [MapItemType.Houses]: {
        cardContent: HousesCardContent,
        requests: {
            oneItemRequest: () => Promise.resolve(),
        },
    },
    [MapItemType.DesignCode]: {
        cardContent: DesignCodeCardContent,
        requests: {
            oneItemRequest: designCode.getObject,
        },
    },
    [MapItemType.DTP]: {
        cardContent: DTPCardContent,
        requests: {
            oneItemRequest: dtp.getObject,
        },
    },
    [MapItemType.OKN]: {
        cardContent: OKNCardContent,
        requests: {
            oneItemRequest: okn.getObject,
        },
    },
    [MapItemType.Lines]: {
        cardContent: () => null,
        requests: {
            oneItemRequest: () => Promise.resolve(),
        },
    },
} as const;
