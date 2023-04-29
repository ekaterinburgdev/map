import { HouseClient } from 'common/data/base/houseBase';
import { DesignCodeObject } from 'common/data/designCode/designCodeObject';
import { DTPObject } from 'common/data/dtp/dtp';
import { OknObjectWithGeometry } from 'common/data/okn/oknObject';

import { MapItemType } from './map-item';

export interface DataLayerBaseState<T> {
    isOpen: boolean;
    data: T[];
}

export type HousesState = DataLayerBaseState<HouseClient>;
export type OKNState = DataLayerBaseState<OknObjectWithGeometry>;
export type DTPState = DataLayerBaseState<DTPObject>;
export type DesignCodeState = DataLayerBaseState<DesignCodeObject>;
export type LinesState = DataLayerBaseState<any>;

export interface State {
    dataLayer: {
        [MapItemType.Houses]: HousesState;
        [MapItemType.OKN]: OKNState;
        [MapItemType.DTP]: DTPState;
        [MapItemType.DesignCode]: DesignCodeState;
        [MapItemType.Lines]: LinesState;
    };
}

export type DataTypes = State['dataLayer'][keyof State['dataLayer']]['data'];

export interface SetDataPayload {
    type: MapItemType;
    data: DataTypes;
}

export interface ToggleDataPayload {
    type: MapItemType;
}
