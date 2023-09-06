import React, { useEffect } from 'react';
import { FillLayer, Layer, LineLayer, Source, useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'types/Filters.types';
import { getLayerStyle } from 'components/Map/helpers/getFeatureState';
import { MapItemType } from 'types/map-item';
import { usePopup } from 'components/Map/providers/usePopup';
import useMapObjectState from '../providers/useMapObjectState';
import { colorLuminance } from '../helpers/colorLuminance';

const QUARTER_LAYER_ID = 'ekb-quarter-inspectors-layer';
const QUARTER_SOURCE_ID = 'ekb-quarter-inspectors-source';

export function QuarterSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);

    useMapObjectState(QUARTER_LAYER_ID);

    useEffect(() => {
        const map = ekbMap.current;

        const handlePointClick = (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];

            openPopup(decodeURI(item?.properties?.quarterTitle), MapItemType.Quarter);
        };

        map.on('click', QUARTER_LAYER_ID, handlePointClick);

        return () => {
            map.off('click', QUARTER_LAYER_ID, handlePointClick);
        };
    }, [ekbMap, openPopup]);

    const layerStyle: FillLayer = {
        type: 'fill',
        id: QUARTER_LAYER_ID,
        source: QUARTER_SOURCE_ID,
        paint: {
            'fill-color': getLayerStyle<string>({
                initial: '#9AADCC',
                hover: colorLuminance('#9AADCC', 0.2),
                active: colorLuminance('#9AADCC', 0.4),
            }),
            'fill-opacity': 0.6,
        },
    };

    const layerStrokeStyle: LineLayer = {
        id: `${QUARTER_LAYER_ID}-outline`,
        type: 'line',
        source: QUARTER_SOURCE_ID,
        paint: {
            'line-color': '#000',
            'line-opacity': 0.5,
            'line-width': 1.5,
        },
    };

    if (activeFilter !== FilterType.Quarter) {
        return null;
    }

    return (
        <Source type="geojson" data="./quarter_inspectors.json" id={QUARTER_SOURCE_ID} generateId>
            <Layer {...layerStyle} />
            <Layer {...layerStrokeStyle} />
        </Source>
    );
}
