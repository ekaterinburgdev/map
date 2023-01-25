import React, { useContext, useEffect, useMemo } from 'react';
import L from 'leaflet';
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
            <TileLayer url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />
            {selectedMarks.map((placemark) => (
                <Point
                    key={placemark.id}
                    id={placemark.id}
                    color={MARKER_COLOR[MapItemType[placemark.type]]}
                    position={placemark.coords}
                    isOpen={placemark.isOpen}
                    openPopup={openPopup}
                    closePopup={closePopup}
                />
            ))}
        </MapContainer>
    );
}

export default MapMainContainer;
