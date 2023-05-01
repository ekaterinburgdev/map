import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapItemType } from 'common/types/map-item';
import { SetDataPayload, ToggleDataPayload } from 'common/types/state';

const initialDataState = {
    isActive: false,
    data: [],
};

const initialState = Object.fromEntries(
    Object.values(MapItemType).map((type) => [type, { ...initialDataState }]),
);

const dataLayerSlice = createSlice({
    name: 'dataLayer',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<SetDataPayload>) {
            const { data, type } = action.payload;

            state[type].data = data;
        },
        toggleData(state, action: PayloadAction<ToggleDataPayload>) {
            const { type } = action.payload;
            state[type].isActive = !state[type].isActive;
        },
    },
});

export const { setData, toggleData } = dataLayerSlice.actions;

export const dataLayerReducer = dataLayerSlice.reducer;
