import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MODEL_CONFIG } from 'components/Model/config';

import { OknAreaType } from 'common/data/okn/oknConstants';
import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { checkIsMobile } from 'common/isMobile';
import { MapItemType } from 'common/types/map-item';
import { LinesData, State } from 'common/types/state';

import { HouseClient } from 'common/data/base/houseBase';
import { OknObjectWithGeometry } from 'common/data/okn/oknObject';
import { DTPObject } from 'common/data/dtp/dtp';
import { DesignCodeObject } from 'common/data/designCode/designCodeObject';

import styles from './MapMainContainer.module.css';

const DEFAULT_ZOOM = checkIsMobile(window.innerWidth) ? 12 : 15;

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
                    <React.Fragment key={`map-data:${activeMapItem}-${objectData.id}`}>
                        {objectData.borders && <MapData {...objectData} />}
                    </React.Fragment>
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
                    <React.Fragment key={`map-data:${activeMapItem}-${id}`}>
                        {attributes.geometry.coordinates && (
                            <MapData
                                id={id}
                                coords={attributes.geometry.coordinates}
                                severityType={attributes.severity}
                            />
                        )}
                    </React.Fragment>
                ));
            }
            case MapItemType.DesignCode: {
                const MapData = MODEL_CONFIG[activeMapItem].mapData;
                const objects = dataObjects[activeFilter].data as DesignCodeObject[];

                return objects.map(({ id, coords, type: designCodeType, preview, name }) => (
                    <React.Fragment key={`map-data:${activeMapItem}-${id}`}>
                        {coords && (
                            <MapData
                                id={id}
                                coords={coords}
                                name={name}
                                type={designCodeType}
                                preview={preview}
                            />
                        )}
                    </React.Fragment>
                ));
            }
            case MapItemType.Lines: {
                const MapData = MODEL_CONFIG[activeMapItem].mapData;
                const linesData = dataObjects[activeFilter].data as LinesData;
                const { lines, points } = linesData;

                const linesMapData = lines.map(({ coords, type, id }) => (
                    <React.Fragment key={`map-data:${activeMapItem}-line-${type}-${id}`}>
                        {coords && (
                            <MapData id={id} positions={coords} lineType={type} figureType="line" />
                        )}
                    </React.Fragment>
                ));
                const pointsMapData = points.map(
                    ({ type, data }) =>
                        data.map(
                            ({
                                id,
                                attributes: {
                                    geometry: { coordinates },
                                    image,
                                },
                            }) => (
                                <React.Fragment
                                    key={`map-data:${activeMapItem}-${type}-point-${id}`}
                                >
                                    {coordinates && (
                                        <MapData
                                            id={id}
                                            positions={coordinates}
                                            lineType={type}
                                            figureType="point"
                                            preview={image}
                                        />
                                    )}
                                </React.Fragment>
                            ),
                        ),
                    // eslint-disable
                );

                return (
                    <>
                        {linesMapData}
                        {pointsMapData}
                    </>
                );
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
