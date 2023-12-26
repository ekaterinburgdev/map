import { FilterType } from 'types/Filters.types';
import { OknAreaType } from 'components/Layers/OKN/oknConstants';
import { LineObject, LineType } from 'components/Layers/Lines/lineType';

import { MapItemType } from 'types/map-item';

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
