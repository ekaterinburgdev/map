import { DTPFilter } from 'features/DTP/Filter/DTPFilter';
import { DesignCodeFilter } from 'features/DesignCode/Filter/DesignCodeFilter';
import { HouseAgeFilter } from 'features/HouseAge/HouseAgeFilter';
import { HouseFloorFilter } from 'features/HouseFloor/HouseFloorFilter';
import { HouseWearTearFilter } from 'features/HouseWearTear/HouseWearTearFilter';
import { LinesFilter } from 'features/Lines/Filter/LinesFilter';
import { OknFilter } from 'features/OKN/Filter/OknFilter';
import { QuarterFilter } from 'features/Quarter/Filter/QuarterFilter';
import { SOURCES_BY_TYPE } from 'constants/sources';
import { SourceType } from 'types/Sources.types';
import { FilterConfig, FilterType } from 'types/Filters.types';
import { FacadeFilter } from 'features/Facade/Filter/FacadeFilter';

export const FILTERS_CONFIG: FilterConfig = {
    [FilterType.HouseAge]: {
        title: 'Возраст домов',
        component: <HouseAgeFilter />,
        source: [SOURCES_BY_TYPE[SourceType.howoldthishouse]],
        isVerified: false,
    },
    [FilterType.HouseFloor]: {
        title: 'Этажность домов',
        component: <HouseFloorFilter />,
        source: [SOURCES_BY_TYPE[SourceType.mingkh], SOURCES_BY_TYPE[SourceType.domaekb]],
        isVerified: false,
    },
    [FilterType.HouseWearTear]: {
        title: 'Степень износа домов',
        component: <HouseWearTearFilter />,
        source: [SOURCES_BY_TYPE[SourceType.mingkh], SOURCES_BY_TYPE[SourceType.domaekb]],
        isVerified: false,
    },
    [FilterType.OKN]: {
        title: 'Объекты культурного наследия',
        component: <OknFilter />,
        source: [SOURCES_BY_TYPE[SourceType.okn]],
        isVerified: false,
    },
    [FilterType.DesignCode]: {
        title: '«Дизайн-код Екатеринбурга»',
        component: <DesignCodeFilter />,
        source: [SOURCES_BY_TYPE[SourceType.design_objects_map]],
        isVerified: true,
    },
    [FilterType.DTP]: {
        title: 'ДТП',
        component: <DTPFilter />,
        source: [SOURCES_BY_TYPE[SourceType.dtp]],
        isVerified: true,
    },
    [FilterType.Line]: {
        title: 'Туристические маршруты',
        component: <LinesFilter />,
        isVerified: true,
    },
    [FilterType.Quarter]: {
        title: 'Квартальные',
        component: <QuarterFilter />,
        source: [SOURCES_BY_TYPE[SourceType.ekb_quarter]],
        isVerified: true,
    },
    [FilterType.HouseFacades]: {
        title: 'Дизайн-код фасадов',
        component: <FacadeFilter />,
        source: [SOURCES_BY_TYPE[SourceType.ekaterinburgdesign]],
        isVerified: true,
    },
};
