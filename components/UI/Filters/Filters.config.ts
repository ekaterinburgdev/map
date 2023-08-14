import { HouseAgeFilter } from 'components/Model/Houses/Filter/Age/HouseAgeFilter';
import { HouseFloorFilter } from 'components/Model/Houses/Filter/Floor/HouseFloorFilter';
import { HouseWearTearFilter } from 'components/Model/Houses/Filter/WearTear/HouseWearTearFilter';
import { DesignCodeFilter } from 'components/Model/DesignCode/Filter/DesignCodeFilter';
import { OknFilter } from 'components/Model/OKN/Filter/Okn/OknFilter';
import { LinesFilter } from 'components/Model/Lines/Filter/LinesFilter';
import { DTPFilter } from 'components/Model/DTP/Filter/DTPFilter';
import { SOURCES_BY_TYPE } from 'common/constants/sources';
import { FilterConfig, FilterType } from './Filters.types';

// @ts-ignore
export const FILTERS_CONFIG: FilterConfig = {
    [FilterType.HouseAge]: {
        title: 'Возраст домов',
        component: HouseAgeFilter,
        source: SOURCES_BY_TYPE.howoldthishouse,
        isVerified: false,
    },
    [FilterType.HouseFloor]: {
        title: 'Этажность домов',
        component: HouseFloorFilter,
        source: SOURCES_BY_TYPE.howoldthishouse,
        isVerified: false,
    },
    [FilterType.HouseWearTear]: {
        title: 'Степень износа домов',
        component: HouseWearTearFilter,
        source: SOURCES_BY_TYPE.howoldthishouse,
        isVerified: false,
    },
    [FilterType.OKN]: {
        title: 'Объекты культурного наследия',
        component: OknFilter,
        source: SOURCES_BY_TYPE.okn,
        isVerified: false,
    },
    [FilterType.DesignCode]: {
        title: '«Дизайн-код Екатеринбурга»',
        component: DesignCodeFilter,
        source: SOURCES_BY_TYPE.ekaterinburgdesign,
        isVerified: true,
    },
    [FilterType.DTP]: {
        title: 'ДТП',
        component: DTPFilter,
        source: SOURCES_BY_TYPE.dtp,
        isVerified: true,
    },
    [FilterType.Line]: {
        title: 'Туристические маршруты',
        component: LinesFilter,
        isVerified: true,
    },
};
