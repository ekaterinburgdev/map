import { State } from 'common/types/state';

export const activeFilterSelector = (state: State) => state.dataLayer.activeFilter;

export const activeFilterParamsSelector = (state: State) => state.dataLayer.activeFilterParams;
