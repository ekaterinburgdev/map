import { DesignCodeItemType } from '../designCodeObject';
import { DesignCodeFilterState, DesignCodeFilterAction } from './DesignCodeFilter.types';

export function designCodeReducer(state: DesignCodeFilterState, action: DesignCodeFilterAction) {
  switch (action.type) {
    case 'toggle':
      return { ...state, [action.designCodeItemType]: !state[action.designCodeItemType] };
    default:
      return state;
  }
}

export const designCondeInitalState = Object.values(DesignCodeItemType).reduce((acc, type) => {
  acc[type] = true;

  return acc;
}, {} as DesignCodeFilterState);
