import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { DEFAULT_BULDING_COLOR_NORMAL } from 'constants/colors';
import { BUILDING_LAYER_ID } from 'constants/map';
import { getLayerStyle } from 'features/Map/helpers/getFeatureState';
import useMapObjectState from 'features/Map/helpers/useMapObjectState';
import facades from 'public/ekb-facades.json';
import { FilterType } from 'types/Filters.types';

const FACADES_IDS = Object.keys(facades);

function FacadeStyles() {
    const ekbMap = useMap();

    useEffect(() => {
        const map = ekbMap?.current?.getMap?.();

        map.setStyle({
            ...map?.getStyle(),
            layers: map?.getStyle().layers.map((layer) => {
                if (layer.id === BUILDING_LAYER_ID) {
                    return {
                        ...layer,
                        paint: {
                            // @ts-ignore
                            ...layer.paint,
                            'fill-extrusion-color': [
                                'match',
                                ['get', 'osm:id'],
                                ['literal'].concat(FACADES_IDS),
                                getLayerStyle<string>({
                                    initial: 'rgba(129, 255, 0, 0.75)',
                                    hover: 'rgba(129, 255, 0, 0.90)',
                                    active: 'rgba(129, 255, 0, 1)',
                                }),
                                DEFAULT_BULDING_COLOR_NORMAL,
                            ],
                        },
                    };
                }
                return layer;
            }),
        });
    }, [ekbMap]);

    useMapObjectState('building');

    return null;
}

export function FacadeSource() {
    const { query } = useRouter();
    const activeFilter = query.filter;

    if (activeFilter !== FilterType.HouseFacades) {
        return null;
    }

    return <FacadeStyles />;
}
