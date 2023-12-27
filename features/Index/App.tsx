import React from 'react';
import { Provider } from 'react-redux';
import { MapProvider } from 'react-map-gl';
import { store } from 'state';
import { AboutProjectIcons } from 'features/About/AboutProjectIcons/AboutProjectIcons';
import { AboutProjectProvider } from 'features/About/AboutProjectProvider';
import { Copyright } from 'features/Copyright/Copyright';
import { MapContextProvider } from 'features/Map/providers/MapProvider';
import { Footer } from 'components/Footer/Footer';
import { Map } from 'features/Map/Map';
import { FILTERS_CONFIG } from './Filters.config';
import { Sidebars } from './Sidebars';

export default function App() {
    return (
        <Provider store={store}>
            <MapProvider>
                <AboutProjectProvider>
                    <MapContextProvider>
                        <Map />
                        <Sidebars />
                        <Copyright filters={FILTERS_CONFIG} />
                        <AboutProjectIcons />
                        <Footer />
                    </MapContextProvider>
                </AboutProjectProvider>
            </MapProvider>
        </Provider>
    );
}
