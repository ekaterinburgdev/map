import { FunctionComponent } from 'react';

export enum FilterType {
    HouseAge = 'houseAge',
    HouseFloor = 'houseFloor',
    HouseWearTear = 'houseWearTear',
    OKN = 'okn',
    DesignCode = 'designCode',
    DTP = 'dtp',
    Line = 'line',
}

export interface FilterConfigItem {
    title: string;
    component: FunctionComponent;
}

export type FilterConfig = Record<FilterType, FilterConfigItem>;
