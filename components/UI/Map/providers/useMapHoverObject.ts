import { useEffect, useRef } from 'react';
import { useMap } from 'react-map-gl';
import { clearActiveObject, setActiveObject } from 'components/helpers/activeObject';

function useMapHoverObject(layerId : string, sourceId: string) {
    const map = useMap().current;
    const hoverObject = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e : mapboxgl.MapMouseEvent) => {
            const item = e.target.queryRenderedFeatures(e.point, { layers: [layerId] })[0];
            if (item) {
                if (hoverObject.current !== null) {
                    clearActiveObject(map, hoverObject.current, sourceId);
                }
                hoverObject.current = item.id;
                setActiveObject(map, hoverObject.current, sourceId);
            }
        };

        const handleMouseLeave = () => {
            if (hoverObject.current !== null) {
                clearActiveObject(map, hoverObject.current, sourceId);
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
