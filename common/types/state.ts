import { HouseClient } from 'common/data/base/houseBase';
import { DesignCodeObject } from 'common/data/designCode/designCodeObject';
import { DTPObject } from 'common/data/dtp/dtp';
import { OknAreaType } from 'common/data/okn/oknConstants';
import { LineObject, LineType } from 'common/data/lines/lineType';
import { OknObjectWithGeometry } from 'common/data/okn/oknObject';
import { FilterType } from 'components/UI/Filters/Filters.types';

import { MapItemType } from './map-item';

export interface DataLayerBaseState<T> {
    data: T[];
    mapItemType: MapItemType;
}

export type HousesState = DataLayerBaseState<HouseClient>;
export type OKNState = DataLayerBaseState<OknObjectWithGeometry>;
export type OKNAreaState = DataLayerBaseState<OknObjectWithGeometry>;
export type DTPState = DataLayerBaseState<DTPObject>;
export type DesignCodeState = DataLayerBaseState<DesignCodeObject>;

export interface LinesData {
    lines: {
        type: LineType;
        id: number;
    }[];
    points: {
        type: LineType;
        data: LineObject[];
    }[];
}

export interface LinesState {
    data: LinesData;
    mapItemType: MapItemType;
}

export interface State {
    dataLayer: {
        activeFilter: FilterType | OknAreaType;
        activeFilterParams: any;
    };
}

export interface SetFilterPayload {
    activeFilter: FilterType | OknAreaType;
    activeFilterParams: any;
}

export interface SetFilterParamsPayload {
    activeFilterParams: any;
}

export interface ToggleDataPayload {
    type: FilterType | OknAreaType;
}
