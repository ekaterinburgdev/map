import { HouseClient } from 'common/data/base/houseBase';
import { DesignCodeObject } from 'common/data/designCode/designCodeObject';
import { DTPObject } from 'common/data/dtp/dtp';
import { OknAreaType } from 'common/data/okn/oknConstants';
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
export type LinesState = DataLayerBaseState<any>;

export interface State {
    dataLayer: {
        objects: {
            [FilterType.HouseAge]: HousesState;
            [FilterType.HouseFloor]: HousesState;
            [FilterType.OKN]: OKNState;
            [FilterType.DTP]: DTPState;
            [FilterType.DesignCode]: DesignCodeState;
            [FilterType.Line]: LinesState;
            [OknAreaType.ObjectZone]: OKNAreaState;
            [OknAreaType.ProtectZone]: OKNAreaState;
            [OknAreaType.SecurityZone]: OKNAreaState;
        };
        activeFilter: FilterType | OknAreaType;
    };
}

export type DataTypes = State['dataLayer']['objects'][keyof State['dataLayer']['objects']]['data'];

export interface SetDataPayload {
    type: keyof State['dataLayer']['objects'];
    data: DataTypes;
}

export interface ToggleDataPayload {
    type: FilterType | OknAreaType;
}
