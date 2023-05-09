import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MODEL_CONFIG } from 'components/Model/config';

import { OknAreaType } from 'common/data/okn/oknConstants';
import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { checkIsMobile } from 'common/isMobile';
import { MapItemType } from 'common/types/map-item';
import { State } from 'common/types/state';

import { HouseClient } from 'common/data/base/houseBase';
import { OknObjectWithGeometry } from 'common/data/okn/oknObject';
import { DTPObject } from 'common/data/dtp/dtp';
import { DesignCodeObject } from 'common/data/designCode/designCodeObject';

import styles from './MapMainContainer.module.css';

const DEFAULT_ZOOM = checkIsMobile() ? 12 : 15;

function MapMainContainer() {
    const position: [number, number] = COORDS_EKATERINBURG;

    const dataObjects = useSelector((state: State) => state.dataLayer.objects);
    const activeFilter = useSelector((state: State) => state.dataLayer.activeFilter);
    const activeMapData = useMemo(() => {
        const activeMapItem = dataObjects[activeFilter]?.mapItemType;

        switch (activeMapItem) {
            case MapItemType.Houses: {
                const MapData = MODEL_CONFIG[activeMapItem].mapData;
                const objects = dataObjects[activeFilter].data as HouseClient[];

                return objects.map((objectData) => (
                    <>
                        {objectData.borders && (
                            <MapData
                                key={`map-data:${activeMapItem}-${objectData.id}`}
                                {...objectData}
                            />
                        )}
                    </>
                ));
            }
            case MapItemType.OKN: {
                const MapData = MODEL_CONFIG[activeMapItem].mapData;
                const objects = dataObjects[activeFilter].data as OknObjectWithGeometry[];
                const objectZones = dataObjects[OknAreaType.ObjectZone].data;
                const protectZones = dataObjects[OknAreaType.ProtectZone].data;
                const securityZones = dataObjects[OknAreaType.SecurityZone].data;

                const objectsProps = objects.map(({ id, attributes }) => ({
                    id,
                    coords: attributes.geometry.coordinates,
                    key: `map-data:${activeMapItem}-object-${id}`,
                    type: attributes.category,
                    name: attributes.name,
                }));

                const objectZonesProps = objectZones.map(({ id, attributes }) => ({
                    id,
                    coords: attributes.geometry.coordinates,
                    key: `map-data:${activeMapItem}-object-zone-${id}`,
                    type: OknAreaType.ObjectZone,
                }));

                const protectZonesProps = protectZones.map(({ id, attributes }) => ({
                    id,
                    coords: attributes.geometry.coordinates,
                    key: `map-data:${activeMapItem}-protect-zone-${id}`,
                    type: OknAreaType.ProtectZone,
                    unclickable: true,
                }));

                const securityZonesProps = securityZones.map(({ id, attributes }) => ({
                    id,
                    coords: attributes.geometry.coordinates,
                    key: `map-data:${activeMapItem}-security-zone-${id}`,
                    type: OknAreaType.SecurityZone,
                    unclickable: true,
                }));

                return (
                    <>
                        {[
                            ...objectsProps,
                            ...objectZonesProps,
                            ...protectZonesProps,
                            ...securityZonesProps,
                        ].map((props) => (
                            <MapData {...props} />
                        ))}
                    </>
                );
            }
            case MapItemType.DTP: {
                const MapData = MODEL_CONFIG[activeMapItem].mapData;
                const objects = dataObjects[activeFilter].data as DTPObject[];

                return objects.map(({ id, attributes }) => (
                    <>
                        {attributes.geometry.coordinates && (
                            <MapData
                                id={id}
                                coords={attributes.geometry.coordinates}
                                key={`map-data:${activeMapItem}-${id}`}
                            />
                        )}
                    </>
                ));
            }
            case MapItemType.DesignCode: {
                const MapData = MODEL_CONFIG[activeMapItem].mapData;
                const objects = dataObjects[activeFilter].data as DesignCodeObject[];

                return objects.map(({ id, coords, type: designCodeType }) => (
                    <>
                        {coords && (
                            <MapData
                                id={id}
                                coords={coords}
                                type={designCodeType}
                                key={`map-data:${activeMapItem}-${id}`}
                            />
                        )}
                    </>
                ));
            }
            default:
                return null;
        }
    }, [activeFilter, dataObjects]);

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
            {activeMapData}
        </MapContainer>
    );
}

export default MapMainContainer;
