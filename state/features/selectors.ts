import { State } from 'state/state';

export const activeFilterSelector = (state: State) => state.dataLayer.activeFilter;

export const activeFilterParamsSelector = (state: State) => state.dataLayer.activeFilterParams;
