import React from 'react';
import { Provider } from 'react-redux';
import { MapProvider } from 'react-map-gl';

import { store } from 'state';

import { LeftSidebar } from 'components/UI/LeftSidebar/LeftSidebar';
import { MobileFilters } from 'components/UI/Filters';
import { RightSidebar } from 'components/UI/RightSidebar/RightSidebar';
import { MobileCard } from 'components/UI/Card';
import { useIsMobile } from 'common/isMobile';
import { EditButtonLink } from 'components/Model/EditButtonLink/EditButtonLink';
import { RightBottomIcons } from 'components/UI/RightBottomIcons/RightBottomIcons';
import { MapContextProvider } from './UI/Map/providers/MapProvider';
import { Footer } from './UI/Footer/Footer';
import { Copyright } from './UI/Copyright/Copyright';
import { VectorMap } from './UI/Map/VectorMap';

export default function App() {
    const isMobile = useIsMobile();

    return (
        <Provider store={store}>
            <MapProvider>
                <MapContextProvider>
                    <VectorMap />
                    {!isMobile && (
                        <>
                            <LeftSidebar />
                            <RightSidebar />
                            <RightBottomIcons />
                        </>
                    )}
                    <Copyright />
                    {/* <EditButtonLink /> */}
                    <Footer />
                    {isMobile && (
                        <>
                            <MobileFilters />
                            <MobileCard />
                        </>
                    )}
                </MapContextProvider>
            </MapProvider>
        </Provider>
    );
}
