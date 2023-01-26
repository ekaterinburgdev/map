import React, { useEffect, useState } from 'react';

import { houseAge } from 'common/data/houseAge/houseAge';
import { dtp } from 'common/data/dtp/dtp';
import { DtpSeverityType } from 'common/data/dtp/dtpSeverityType';
import { OknObjectWithGeometry } from 'common/data/okn/oknObject';
import { okn } from 'common/data/okn/okn';
import { OknObjectSignificanceType } from 'common/data/okn/oknConstants';

import { Card } from './UI/Card';
import { Copyright } from './UI/Copyright/Copyright';
import { Footer } from './UI/Footer/Footer';
import { MapContextProvider } from './UI/Map/providers/MapProvider';
import MapMainContainer from './UI/Map/MainContainer/MapMainContainer';

export default function App() {
    const [houses, setHouses] = useState<{ borders: [number, number][]; id: string }[]>([]);
    const [dtps, setDtps] = useState<any[]>([]);
    const [okns, setOkns] = useState<OknObjectWithGeometry[]>([]);

    useEffect(() => {
        (async function getData() {
            const data = await dtp.getObjectsBySeverity(DtpSeverityType.WithDead);
            setDtps(data);

            const oknsResponse = await okn.getObjectsBySignificanceType(
                OknObjectSignificanceType.Municipal,
            );
            setOkns(oknsResponse);

            const housesResponse = await houseAge.getObjectsPolygonsByRange('1730', '1980');
            setHouses(housesResponse);
        }());
    }, []);

    return (
        <>
            <MapContextProvider>
                <MapMainContainer houses={houses} dtps={dtps} okns={okns} />
                <Card />
            </MapContextProvider>

            <Copyright />
            <Footer />
        </>
    );
}
