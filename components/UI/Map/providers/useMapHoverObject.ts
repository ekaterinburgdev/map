import { useEffect, useRef } from 'react';
import { useMap } from 'react-map-gl';
import { clearActiveObject, setActiveObject } from 'components/helpers/activeObject';

function useMapHoverObject(layerId : string) {
    const map = useMap().current;
    const hoverObject = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e : mapboxgl.MapMouseEvent) => {
            const item = e.target.queryRenderedFeatures(e.point, { layers: [layerId] })[0];
            if (item) {
                if (hoverObject.current && item.id !== hoverObject.current.id) {
                    clearActiveObject(map, hoverObject.current);
                }
                hoverObject.current = item;
                setActiveObject(map, item);
            }
        };

        const handleMouseLeave = () => {
            if (hoverObject?.current?.id) {
                clearActiveObject(map, hoverObject.current);
            }
            hoverObject.current = null;
        };

        map.on('mousemove', layerId, handleMouseMove);
        map.on('mouseleave', layerId, handleMouseLeave);

        return () => {
            map.off('mousemove', layerId, handleMouseMove);
            map.off('mouseleave', layerId, handleMouseLeave);
        };
    });

    return hoverObject.current;
}

export default useMapHoverObject;
