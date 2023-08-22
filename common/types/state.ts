import { OknAreaType } from 'common/data/okn/oknConstants';
import { LineObject, LineType } from 'common/data/lines/lineType';
import { FilterType } from 'components/UI/Filters/Filters.types';

import { MapItemType } from './map-item';

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
