import { OknAreaType, OknObjectSignificanceType } from 'common/data/okn/oknConstants';

export interface AreaAction {
    type: 'toggle';
    areaType: OknAreaType;
}
export interface ObjectsAction {
    type: 'toggle';
    objectsType: OknObjectSignificanceType;
}

export type AreaState = Record<OknAreaType, boolean>;
export type ObjectsState = Record<OknObjectSignificanceType, boolean>;
