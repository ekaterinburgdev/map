import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import { MODEL_CONFIG } from 'components/Model/config';

import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { checkIsMobile } from 'common/isMobile';
import { MapItemType } from 'common/types/map-item';
import { State } from 'common/types/state';

import styles from './MapMainContainer.module.css';

const DEFAULT_ZOOM = checkIsMobile() ? 12 : 15;

function MapMainContainer() {
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

    const dataLayer = useSelector((state: State) => state.dataLayer);

    return (
        <MapContainer
            center={position}
            scrollWheelZoom
            attributionControl={false}
            zoomControl={false}
            zoom={DEFAULT_ZOOM}
            className={styles.Map}
            minZoom={7}
        >
            <TileLayer url="https://tiles.ekaterinburg.io/styles/basic-black/{z}/{x}/{y}@2x.png" />
            <>
                {MODEL_CONFIG.map(({ type, mapData: MapData }) => {
                    switch (type) {
                        case MapItemType.Houses: {
                            const { data: objects, isActive } = dataLayer[type];

                            if (!isActive) {
                                return null;
                            }

                            return objects.map((objectData) => (
                                <>
                                    {objectData.borders && (
                                        <MapData
                                            key={`map-data:${type}-${objectData.id}`}
                                            {...objectData}
                                        />
                                    )}
                                </>
                            ));
                        }
                        case MapItemType.OKN: {
                            const { data: objects, isActive } = dataLayer[type];

                            if (!isActive) {
                                return null;
                            }

                            return objects.map(({ id, attributes }) => (
                                <>
                                    {attributes.geometry.coordinates && (
                                        <MapData
                                            id={id}
                                            coords={attributes.geometry.coordinates}
                                            key={`map-data:${type}-${id}`}
                                        />
                                    )}
                                </>
                            ));
                        }
                        case MapItemType.DTP: {
                            const { data: objects, isActive } = dataLayer[type];

                            if (!isActive) {
                                return null;
                            }

                            return objects.map(({ id, attributes }) => (
                                <>
                                    {attributes.geometry.coordinates && (
                                        <MapData
                                            id={id}
                                            coords={attributes.geometry.coordinates}
                                            key={`map-data:${type}-${id}`}
                                        />
                                    )}
                                </>
                            ));
                        }
                        case MapItemType.DesignCode: {
                            const { data: objects, isActive } = dataLayer[type];

                            if (!isActive) {
                                return null;
                            }

                            return objects.map(({ id, coords, type: designCodeType }) => (
                                <>
                                    {coords && (
                                        <MapData
                                            id={id}
                                            coords={coords}
                                            type={designCodeType}
                                            key={`map-data:${type}-${id}`}
                                        />
                                    )}
                                </>
                            ));
                        }
                        default:
                            return null;
                    }
                })}
            </>
        </MapContainer>
    );
}

export default MapMainContainer;
