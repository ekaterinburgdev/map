import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'state';

import { Card } from './UI/Card';
import { Copyright } from './UI/Copyright/Copyright';
import { Footer } from './UI/Footer/Footer';
import { MapContextProvider } from './UI/Map/providers/MapProvider';
import MapMainContainer from './UI/Map/MainContainer/MapMainContainer';
import { Filters } from './UI/Filters/Filters';

export default function App() {
    return (
        <Provider store={store}>
            <MapContextProvider>
                <MapMainContainer />
                <Card />
            </MapContextProvider>

            <Filters />
            <Copyright />
            <Footer />
        </Provider>
    );
}
