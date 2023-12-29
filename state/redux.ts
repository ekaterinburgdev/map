import { configureStore } from '@reduxjs/toolkit';
import { sloyReducer } from 'sloy-map';

export const store = configureStore({
    reducer: {
        sloy: sloyReducer,
    },
});
