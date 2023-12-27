import { FeatureIdentifier } from 'maplibre-gl';
import { MapRef, useMap } from 'react-map-gl';
import { useEffect, useRef } from 'react';

function setObjectState(
    map: MapRef,
    mapObject: FeatureIdentifier,
    settings: { [key: string]: boolean },
    cursorPointer = true,
) {
    map.getCanvas().style.cursor = cursorPointer ? 'pointer' : 'default';
    map.setFeatureState(mapObject, settings);
}

function useMapObjectState(layerId: string) {
    const map = useMap().current;
    const activeObject = useRef(null);
    const hoverObject = useRef(null);

    const getItem = (point: mapboxgl.Point) =>
        map.queryRenderedFeatures(point, { layers: [layerId] })[0];

    useEffect(() => {
        const handleClick = (e: mapboxgl.MapMouseEvent) => {
            const item = getItem(e.point);
            if (activeObject.current && item.id !== activeObject.current.id) {
                setObjectState(map, activeObject.current, { active: false });
                activeObject.current = null;
            }

            if (item) {
                activeObject.current = item;
                setObjectState(map, activeObject.current, { active: true });
            }
        };

        const handleMouseMove = (e: mapboxgl.MapMouseEvent) => {
            const item = getItem(e.point);
            if (item) {
                if (hoverObject.current && item.id !== hoverObject.current.id) {
                    setObjectState(map, hoverObject.current, { hover: false }, false);
                }
                hoverObject.current = item;
                setObjectState(map, item, { hover: true });
            }
        };

        const handleMouseLeave = () => {
            if (hoverObject?.current?.id) {
                setObjectState(map, hoverObject.current, { hover: false }, false);
            }
            hoverObject.current = null;
        };

        map.on('click', layerId, handleClick);
        map.on('mousemove', layerId, handleMouseMove);
        map.on('mouseleave', layerId, handleMouseLeave);

        return () => {
            map.off('click', layerId, handleClick);
            map.off('mousemove', layerId, handleMouseMove);
            map.off('mouseleave', layerId, handleMouseLeave);
        };
    });

    return hoverObject.current;
}

export default useMapObjectState;
