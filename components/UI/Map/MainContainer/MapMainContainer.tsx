import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { checkIsMobile } from 'common/isMobile';

import 'leaflet/dist/leaflet.css';
import { OKNMapData } from 'components/Model/OKN/MapData/MapData';
import { HousesMapData } from 'components/Model/Houses/MapData/MapData';
import { HouseObject } from 'common/data/base/houseBase';
import { OknObjectWithGeometry } from 'common/data/okn/oknObject';
import { DTPObject } from 'common/data/dtp/dtp';
import { DTPMapData } from 'components/Model/DTP/MapData/MapData';
import styles from './MapMainContainer.module.css';

const DEFAULT_ZOOM = checkIsMobile() ? 12 : 15;

interface Props {
    houses: {
        borders: HouseObject['attributes']['borders']['coordinates'];
        id: string;
    }[];
    dtps: DTPObject[];
    okns: OknObjectWithGeometry[];
}

function MapMainContainer({ houses, dtps, okns }: Props) {
    const position: [number, number] = COORDS_EKATERINBURG;

    useEffect(() => {
        async function init() {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
        }

        init();
    }, []);

    return (
        <MapContainer
            center={position}
            scrollWheelZoom
            attributionControl={false}
            zoomControl={false}
            zoom={DEFAULT_ZOOM}
            className={styles.Map}
        >
            <TileLayer url="https://tiles.ekaterinburg.io/styles/basic-black/{z}/{x}/{y}@2x.png" />
            <>
                {houses.map((house) => (
                    <>{house.borders && <HousesMapData borders={house.borders} id={house.id} />}</>
                ))}
                {okns.map((okn) => (
                    <>
                        {okn.attributes.geometry.coordinates && (
                            <OKNMapData id={okn.id} coords={okn.attributes.geometry.coordinates} />
                        )}
                    </>
                ))}
                {dtps.map((dtp) => (
                    <>
                        {dtp.attributes.geometry.coordinates && (
                            <DTPMapData id={dtp.id} coords={dtp.attributes.geometry.coordinates} />
                        )}
                    </>
                ))}
            </>
        </MapContainer>
    );
}

export default MapMainContainer;
