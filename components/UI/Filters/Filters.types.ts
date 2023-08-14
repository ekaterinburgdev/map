import { FunctionComponent } from 'react';
import { Source } from 'common/types/sources';

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
    source?: Source;
    isVerified: boolean;
}

export type FilterConfig = Record<FilterType, FilterConfigItem>;
