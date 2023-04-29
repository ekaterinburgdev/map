import React from 'react';

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

import { LinesMapData } from './Lines/MapData';

import { OKNCardContent } from './OKN/CardContent';
import { OKNMapData } from './OKN/MapData/MapData';
import { HouseAgeFilter } from './Houses/Filter/HouseAgeFilter';

export const MODEL_CONFIG = [
    {
        type: MapItemType.Houses,
        cardContent: HousesCardContent,
        mapData: HousesMapData,
        requests: {
            oneItemRequest: houseBase.getObject,
        },
        filters: [
            {
                title: 'Возраст домов',
                component: HouseAgeFilter,
            },
            // {
            //     title: 'Этажность домов',
            //     component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
            // },
        ],
    },
    {
        type: MapItemType.DesignCode,
        cardContent: DesignCodeCardContent,
        mapData: DesignCodeMapData,
        requests: {
            oneItemRequest: designCode.getObject,
        },
        filters: [
            {
                title: '«Дизайн-код Екатеринбурга»',
                component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
            },
        ],
    },
    {
        type: MapItemType.DTP,
        cardContent: DTPCardContent,
        mapData: DTPMapData,
        requests: {
            oneItemRequest: dtp.getObject,
        },
        filters: [
            {
                title: 'Дорожно-транспортные происшествия',
                component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
            },
        ],
    },
    {
        type: MapItemType.OKN,
        cardContent: OKNCardContent,
        mapData: OKNMapData,
        requests: {
            oneItemRequest: okn.getObject,
        },
        filters: [
            {
                title: 'Объекты культурного наследия',
                component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
            },
        ],
    },
    {
        type: MapItemType.Lines,
        cardContent: () => null,
        mapData: LinesMapData,
        requests: {
            oneItemRequest: () => Promise.resolve(),
        },
        filters: [
            {
                title: 'Цветные линии Екатеринбурга',
                component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
            },
        ],
    },
] as const;
