import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { BUILDING_LAYER_ID } from 'constants/map';
import { DEFAULT_BULDING_COLOR_NORMAL } from 'constants/colors';
import { activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'types/Filters.types';
import facades from '../../../public/Facade Design Code 2023 (2).json';
import { getLayerStyle } from '../helpers/getFeatureState';
import useMapObjectState from '../providers/useMapObjectState';

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
    const activeFilter = useSelector(activeFilterSelector);

    if (activeFilter !== FilterType.HouseFacades) {
        return null;
    }

    return <FacadeStyles />;
}
