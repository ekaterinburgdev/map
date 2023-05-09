import { MapItemType } from 'common/types/map-item';

import { dtp } from 'common/data/dtp/dtp';
import { okn } from 'common/data/okn/okn';
import { houseBase } from 'common/data/base/houseBase';
import { designCode } from 'common/data/designCode/designCode';

import { DesignCodeCardContent } from './DesignCode/CardContent/CardContent';
import { DesignCodeMapData } from './DesignCode/MapData/MapData';

import { DTPCardContent } from './DTP/CardContent/CardContent';
import { DTPMapData } from './DTP/MapData/MapData';

import { HousesCardContent } from './Houses/CardContent/CardContent';
import { HousesMapData } from './Houses/MapData/MapData';

import { LinesMapData } from './Lines/MapData/MapData';

import { OKNCardContent } from './OKN/CardContent';
import { OKNMapData } from './OKN/MapData/MapData';

export const MODEL_CONFIG = {
    [MapItemType.Houses]: {
        cardContent: HousesCardContent,
        mapData: HousesMapData,
        requests: {
            oneItemRequest: houseBase.getObject,
        },
    },
    [MapItemType.DesignCode]: {
        cardContent: DesignCodeCardContent,
        mapData: DesignCodeMapData,
        requests: {
            oneItemRequest: designCode.getObject,
        },
    },
    [MapItemType.DTP]: {
        cardContent: DTPCardContent,
        mapData: DTPMapData,
        requests: {
            oneItemRequest: dtp.getObject,
        },
    },
    [MapItemType.OKN]: {
        cardContent: OKNCardContent,
        mapData: OKNMapData,
        requests: {
            oneItemRequest: okn.getObject,
        },
    },
    [MapItemType.Lines]: {
        cardContent: () => null,
        mapData: LinesMapData,
        requests: {
            oneItemRequest: () => Promise.resolve(),
        },
    },
} as const;
