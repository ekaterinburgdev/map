import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetFilterParamsPayload, SetFilterPayload, State, ToggleDataPayload } from 'state/state';
import { FilterType } from 'types/Filters.types';
import { getFilterTypeFromHash } from 'utils/hash';

export const initialState: State['dataLayer'] = {
    activeFilter: (getFilterTypeFromHash() as FilterType) || Object.values(FilterType)[0],
    activeFilterParams: null,
};

const dataLayerSlice = createSlice({
    name: 'dataLayer',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<SetFilterPayload>) {
            const { activeFilter, activeFilterParams } = action.payload;
            state.activeFilter = activeFilter;
            state.activeFilterParams = activeFilterParams;
        },
        setFilterParams(state, action: PayloadAction<SetFilterParamsPayload>) {
            const { activeFilterParams } = action.payload;
            state.activeFilterParams = activeFilterParams;
        },
        toggleData(state, action: PayloadAction<ToggleDataPayload>) {
            const { type } = action.payload;

            state.activeFilter = type === state.activeFilter ? null : type;
            state.activeFilterParams = null;
        },
    },
});

export const { toggleData, setFilter, setFilterParams } = dataLayerSlice.actions;

export const dataLayerReducer = dataLayerSlice.reducer;
