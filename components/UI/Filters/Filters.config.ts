import { HouseAgeFilter } from 'components/Model/Houses/Filter/Age/HouseAgeFilter';
import { HouseFloorFilter } from 'components/Model/Houses/Filter/Floor/HouseFloorFilter';
import { DesignCodeFilter } from 'components/Model/DesignCode/Filter/DesignCodeFilter';
import { OknFilter } from 'components/Model/OKN/Filter/Okn/OknFilter';
import { LinesFilter } from 'components/Model/Lines/Filter/LinesFilter';
import { DTPFilter } from 'components/Model/DTP/Filter/DTPFilter';
import { HouseWearTearFilter } from 'components/Model/Houses/Filter/WearTear/HouseWearTearFilter';
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
    [FilterType.HouseWearTear]: {
        title: 'Износ домов',
        component: HouseWearTearFilter,
    },
    [FilterType.OKN]: {
        title: 'Объекты культурного наследия',
        component: OknFilter,
    },
    [FilterType.DesignCode]: {
        title: '«Дизайн-код Екатеринбурга»',
        component: DesignCodeFilter,
    },
    [FilterType.DTP]: {
        title: 'Дорожно-транспортные происшествия',
        component: DTPFilter,
    },
    [FilterType.Line]: {
        title: 'Цветные линии Екатеринбурга',
        component: LinesFilter,
    },
};
