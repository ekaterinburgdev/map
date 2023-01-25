import React, { useContext, useEffect, useMemo } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { MapItem, MapItemType } from 'common/types/map-item';
import { checkIsMobile } from 'common/isMobile';
import { MARKER_COLOR } from 'common/constants/colors';
import { Point } from '../Point';
import { MapContext } from '../providers/MapProvider';
import { Shape } from '../Shape/Shape';

import styles from './MapMainContainer.module.css';
import 'leaflet/dist/leaflet.css';

const DEFAULT_ZOOM = checkIsMobile() ? 12 : 15;

interface Props {
    placemarksData: MapItem[];
}

function MapMainContainer({ placemarksData }: Props) {
    const position: [number, number] = COORDS_EKATERINBURG;
    const {
        placemarks, popup, selectedMarksTypes, savePlacemarks, openPopup, closePopup,
    } = useContext(MapContext);

    useEffect(() => {
        async function init() {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });

            savePlacemarks(placemarksData);
        }

        init();
    }, [savePlacemarks, placemarksData]);

    const selectedMarks: (MapItem & { isOpen: boolean })[] = useMemo(
        () => placemarks
            .filter((mark) => selectedMarksTypes.includes(mark.type))
            .map((m) => ({ ...m, isOpen: m.id === popup?.id })),
        [placemarks, selectedMarksTypes, popup?.id],
    );

    return (
        <MapContainer
            center={position}
            scrollWheelZoom
            attributionControl={false}
            zoomControl={false}
            zoom={DEFAULT_ZOOM}
            className={styles.Map}
        >
            <TileLayer url="https://tiles.ekaterinburg.io/styles/basic/{z}/{x}/{y}@2x.png" />
            {selectedMarks.map((placemark) => (
                <>
                    {placemark.coords && placemark.type === MapItemType.OKN && (
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        <>
                            {Array.isArray(placemark.coords[0]) ? (
                                <Shape
                                    openModal={openPopup}
                                    id={placemark.id}
                                    type={placemark.type}
                                    positions={placemark.coords as LatLngExpression[]}
                                    color={MARKER_COLOR[placemark.type]}
                                    fillOpacity={0.3}
                                    weight={3}
                                    dashArray="8 8 8"
                                />
                            ) : (
                                <Point
                                    key={placemark.type + placemark.id}
                                    id={placemark.id}
                                    type={placemark.type}
                                    color={MARKER_COLOR[placemark.type]}
                                    position={placemark.coords as LatLngExpression}
                                    preview={null}
                                    isOpen={placemark.isOpen}
                                    openPopup={openPopup}
                                    closePopup={closePopup}
                                />
                            )}
                        </>
                    )}
                    {placemark.borders && placemark.type === MapItemType.Houses && (
                        <Shape
                            openModal={openPopup}
                            id={placemark.id}
                            type={placemark.type}
                            positions={placemark.borders}
                            color={MARKER_COLOR[placemark.type]}
                        />
                    )}
                </>
            ))}
        </MapContainer>
    );
}

export default MapMainContainer;
