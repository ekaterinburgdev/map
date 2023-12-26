import { OknAreaType, OknObjectSignificanceType } from '../oknConstants';
import { AreaAction, AreaState, ObjectsAction, ObjectsState } from './OknFilter.types';

export function areaReducer(state: AreaState, action: AreaAction) {
  switch (action.type) {
    case 'toggle':
      return { ...state, [action.areaType]: !state[action.areaType] };
    default:
      return state;
  }
}

export const areaInitalState = Object.values(OknAreaType).reduce((acc, type) => {
  acc[type] = false;

  return acc;
}, {} as AreaState);

export function objectsReducer(state: ObjectsState, action: ObjectsAction) {
  switch (action.type) {
    case 'toggle':
      return { ...state, [action.objectsType]: !state[action.objectsType] };
    default:
      return state;
  }
}

export const objectsInitalState = Object.values(OknObjectSignificanceType).reduce((acc, type) => {
  acc[type] = true;

  return acc;
}, {} as ObjectsState);
