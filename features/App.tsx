'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { SloyMap, ILayer, OverrideLayersFn, internalTranslations } from 'sloy-map';
import { defaultTheme } from 'sloy-ui';
import { store } from 'state/redux';
import { AboutProjectIcons } from 'features/About/AboutProjectIcons/AboutProjectIcons';
import { Footer } from 'features/Footer/Footer';
import { copyrights, defaultLayers, defaultMapState, defaultSources } from 'state/config';
import ekbLoader from 'public/ekb-loader.svg';
import { overrideCard } from './CustomCardContent/overrideCard';
import { QuarterFilter } from './CustomFilterContent/QuarterFilter';
import { FacadeFilter } from './CustomFilterContent/FacadeFilter';
import { getHouseMeta } from './Buildings/houseBase';

import 'sloy-map/style.css';

function AppMap() {
    const [finalSources, setFinalSources] = useState(defaultSources);
    const overrideLayers: OverrideLayersFn = useCallback((layer: ILayer) => {
        switch (layer.id) {
            case 'ekb-quarter':
                return <QuarterFilter />;
            case 'ekb-facades':
                return <FacadeFilter />;
            default:
                return null;
        }
    }, []);

    useEffect(() => {
        getHouseMeta().then((houseMeta) => {
            const setProperties = (properties, fields) =>
                properties.map((p) => {
                    if (fields[p.id]) {
                        return {
                            ...p,
                            range: p.range.map((item, i) => ({
                                ...item,
                                value: houseMeta[fields[p.id]][i] || 0,
                            })),
                        };
                    }

                    return p;
                });

            setFinalSources(
                finalSources.map((s) => {
                    if (s.id === 'osmBuilding') {
                        return {
                            ...s,
                            properties: setProperties(s.properties, {
                                'building:year': 'years',
                                'building:levels': 'levels',
                                'building:health': 'health',
                            }),
                        };
                    }

                    return s;
                }),
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SloyMap
            locale="ru-RU"
            overrideLayers={overrideLayers}
            overrideCard={overrideCard}
            theme={defaultTheme}
            translations={internalTranslations}
            mapState={defaultMapState}
            sources={finalSources}
            layers={defaultLayers}
            copyrights={copyrights}
            layout={{ loaderImageSrc: ekbLoader.src }}
        />
    );
}

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Provider store={store}>
                <AppMap />
                <AboutProjectIcons />
                <Footer />
            </Provider>
        </ThemeProvider>
    );
}
