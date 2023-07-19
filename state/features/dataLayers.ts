import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ToggleDataPayload, SetFilterParamsPayload, SetFilterPayload } from 'common/types/state';

import { initialState } from '../constants/dataLayers';

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
