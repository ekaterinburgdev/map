import React from 'react';

import { HouseAgeFilter } from 'components/Model/Houses/Filter/Age/HouseAgeFilter';
import { HouseFloorFilter } from 'components/Model/Houses/Filter/Floor/HouseFloorFilter';

import { FilterConfig, FilterType } from './Filters.types';

export const FILTERS_CONFIG: FilterConfig = {
    [FilterType.HouseAge]: {
        title: 'Возраст домов',
        component: HouseAgeFilter,
    },
    [FilterType.HouseFloor]: {
        title: 'Этажность домов',
        component: HouseFloorFilter,
    },
    [FilterType.OKN]: {
        title: 'Объекты культурного наследия',
        component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
    },
    [FilterType.DesignCode]: {
        title: '«Дизайн-код Екатеринбурга»',
        component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
    },
    [FilterType.DTP]: {
        title: 'Дорожно-транспортные происшествия',
        component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
    },
    [FilterType.Line]: {
        title: 'Цветные линии Екатеринбурга',
        component: () => <p style={{ margin: 0 }}>Этого фильтра пока нет</p>,
    },
};
