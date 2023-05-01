import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SetDataPayload, ToggleDataPayload } from 'common/types/state';

import { initialState } from '../constants/dataLayers';

const dataLayerSlice = createSlice({
    name: 'dataLayer',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<SetDataPayload>) {
            const { data, type } = action.payload;

            state.objects[type].data = data;
        },
        toggleData(state, action: PayloadAction<ToggleDataPayload>) {
            const { type } = action.payload;

            state.activeFilter = type === state.activeFilter ? null : type;
        },
    },
});

export const { setData, toggleData } = dataLayerSlice.actions;

export const dataLayerReducer = dataLayerSlice.reducer;
