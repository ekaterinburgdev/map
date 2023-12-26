import { OknAreaType, OknObjectSignificanceType } from '../oknConstants';

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
