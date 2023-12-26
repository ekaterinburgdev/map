import React from 'react';
import { Provider } from 'react-redux';
import { MapProvider } from 'react-map-gl';

import { store } from 'state';

import { AboutProjectIcons } from 'components/AboutProjectIcons/AboutProjectIcons';
import { LeftSidebar } from 'components/LeftSidebar/LeftSidebar';
import { MobileFilters } from 'components/Filters';
import { RightSidebar } from 'components/RightSidebar/RightSidebar';
import { MobileCard } from 'components/Card';
import { useIsDesktop } from 'shared/helpers/isDesktop';
import { MobileAboutProject } from 'components/AboutProjectModal/MobileAboutProject';
import { AboutProjectProvider } from 'state/providers/AboutProjectProvider';
import { AboutProjectModal } from 'components/AboutProjectModal/AboutProjectModal';
import { MapContextProvider } from './Map/providers/MapProvider';
import { Footer } from './Footer/Footer';
import { Copyright } from './Copyright/Copyright';
import { Map } from './Map/Map';

export default function App() {
    const isDesktop = useIsDesktop();

    return (
        <Provider store={store}>
            <MapProvider>
                <AboutProjectProvider>
                    <MapContextProvider>
                        <Map />
                        {isDesktop ? (
                            <>
                                <LeftSidebar />
                                <RightSidebar />
                                <AboutProjectModal />
                            </>
                        ) : (
                            <>
                                <MobileFilters />
                                <MobileCard />
                                <MobileAboutProject />
                            </>
                        )}
                        <Copyright />
                        <AboutProjectIcons />
                        <Footer />
                    </MapContextProvider>
                </AboutProjectProvider>
            </MapProvider>
        </Provider>
    );
}
