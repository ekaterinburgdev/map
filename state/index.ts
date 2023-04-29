import { configureStore } from '@reduxjs/toolkit';

import { dataLayerReducer } from './features/dataLayers';

export const store = configureStore({
    reducer: {
        dataLayer: dataLayerReducer,
    },
});
