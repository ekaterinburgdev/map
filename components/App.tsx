import React from 'react';
import { Provider } from 'react-redux';
import { MapProvider } from 'react-map-gl';

import { AboutProjectIcons } from 'components/UI/AboutProjectIcons/AboutProjectIcons';
import { store } from 'state';

import { LeftSidebar } from 'components/UI/LeftSidebar/LeftSidebar';
import { MobileFilters } from 'components/UI/Filters';
import { RightSidebar } from 'components/UI/RightSidebar/RightSidebar';
import { MobileCard } from 'components/UI/Card';
import { useIsMobile } from 'common/isMobile';
import { MobileAboutProject } from 'components/UI/AboutProjectModal/MobileAboutProject';
import { AboutProjectProvider } from 'components/providers/AboutProjectProvider';
import { AboutProjectModal } from 'components/UI/AboutProjectModal/AboutProjectModal';
import { MapContextProvider } from './UI/Map/providers/MapProvider';
import { Footer } from './UI/Footer/Footer';
import { Copyright } from './UI/Copyright/Copyright';
import { Map } from './UI/Map/Map';

export default function App() {
    const isMobile = useIsMobile();

    return (
        <Provider store={store}>
            <MapProvider>
                <AboutProjectProvider>
                    <MapContextProvider>
                        <Map />
                        {!isMobile && (
                            <>
                                <LeftSidebar />
                                <RightSidebar />
                                <AboutProjectModal />
                            </>
                        )}
                        <Copyright />
                        <AboutProjectIcons />
                        <Footer />
                        {isMobile && (
                            <>
                                <MobileFilters />
                                <MobileCard />
                                <MobileAboutProject />
                            </>
                        )}
                    </MapContextProvider>
                </AboutProjectProvider>
            </MapProvider>
        </Provider>
    );
}
