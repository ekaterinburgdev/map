import { DTPFilter } from 'components/Layers/DTP/Filter/DTPFilter';
import { DesignCodeFilter } from 'components/Layers/DesignCode/Filter/DesignCodeFilter';
import { HouseAgeFilter } from 'components/Layers/Houses/Filter/Age/HouseAgeFilter';
import { HouseFloorFilter } from 'components/Layers/Houses/Filter/Floor/HouseFloorFilter';
import { HouseWearTearFilter } from 'components/Layers/Houses/Filter/WearTear/HouseWearTearFilter';
import { LinesFilter } from 'components/Layers/Lines/Filter/LinesFilter';
import { OknFilter } from 'components/Layers/OKN/Filter/OknFilter';
import { QuarterFilter } from 'components/Layers/Quarter/Filter/QuarterFilter';
import { SOURCES_BY_TYPE } from 'constants/sources';
import { FilterConfig, FilterType } from 'types/Filters.types';
import { FacadeFilter } from './Facade/Filter/FacadeFilter';

export const FILTERS_CONFIG: FilterConfig = {
  [FilterType.HouseAge]: {
    title: 'Возраст домов',
    component: <HouseAgeFilter />,
    source: [SOURCES_BY_TYPE.howoldthishouse],
    isVerified: false,
  },
  [FilterType.HouseFloor]: {
    title: 'Этажность домов',
    component: <HouseFloorFilter />,
    source: [SOURCES_BY_TYPE.mingkh, SOURCES_BY_TYPE.domaekb],
    isVerified: false,
  },
  [FilterType.HouseWearTear]: {
    title: 'Степень износа домов',
    component: <HouseWearTearFilter />,
    source: [SOURCES_BY_TYPE.mingkh, SOURCES_BY_TYPE.domaekb],
    isVerified: false,
  },
  [FilterType.OKN]: {
    title: 'Объекты культурного наследия',
    component: <OknFilter />,
    source: [SOURCES_BY_TYPE.okn],
    isVerified: false,
  },
  [FilterType.DesignCode]: {
    title: '«Дизайн-код Екатеринбурга»',
    component: <DesignCodeFilter />,
    source: [SOURCES_BY_TYPE.design_objects_map],
    isVerified: true,
  },
  [FilterType.DTP]: {
    title: 'ДТП',
    component: <DTPFilter />,
    source: [SOURCES_BY_TYPE.dtp],
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
    source: [SOURCES_BY_TYPE.ekb_quarter],
    isVerified: true,
  },
  [FilterType.HouseFacades]: {
    title: 'Дизайн-код фасадов',
    component: <FacadeFilter />,
    source: [SOURCES_BY_TYPE.ekaterinburgdesign],
    isVerified: true,
  },
};
