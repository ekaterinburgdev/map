import React, { useEffect } from 'react';
import { Source, Layer, useMap } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { SEVERITY_CONFIG } from 'components/Layers/DTP/DTP.constants';
import { MapItemType } from 'types/map-item';
import { getLayerStyle } from 'components/Map/helpers/getFeatureState';
import dtp from '../../../public/ekb-dtp.json';
import { usePopup } from '../providers/usePopup';
import useMapObjectState from '../providers/useMapObjectState';

const DTP_LAYER_ID = 'dtp-point';

export function DtpSource() {
    const ekbMap = useMap();
    const { openPopup } = usePopup();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useMapObjectState(DTP_LAYER_ID);

    useEffect(() => {
        ekbMap?.current?.on?.('click', DTP_LAYER_ID, (e) => {
            const item = e.target.queryRenderedFeatures(e.point)[0];
            openPopup(item.properties?.id, MapItemType.DTP);
        });
    }, [ekbMap, openPopup]);

    if (activeFilter !== FilterType.DTP || !activeFilterParams) {
        return null;
    }

    const data = {
        ...dtp,
        features: dtp.features.filter((feature) => {
            const { severity } = feature.properties;

            const matchSeverity = activeFilterParams.severity.includes(severity);

            const matchYear =
                feature.properties.year >= activeFilterParams.years.from &&
                feature.properties.year < activeFilterParams.years.to;

            const matchParticipants = activeFilterParams.participants.some((c) =>
                feature.properties.participant_categories.includes(c),
            );

            return matchSeverity && matchParticipants && matchYear;
        }),
    };

    const colors = Object.entries(SEVERITY_CONFIG).map(([severity, { color }]) => [
        ['==', ['get', 'severity'], severity],
        color,
    ]);

    const strokeColors = Object.entries(SEVERITY_CONFIG).map(([severity]) => [
        ['==', ['get', 'severity'], severity],
        '#000',
    ]);

    const layerStyle: CircleLayer = {
        id: DTP_LAYER_ID,
        type: 'circle',
        source: 'ekb-dtp-source',
        paint: {
            'circle-radius': getLayerStyle<number>({ initial: 8, hover: 10, active: 12 }),
            // @ts-ignore
            'circle-color': ['case'].concat(...colors).concat(['rgba(0, 0, 0, 0)']),
            // @ts-ignore
            'circle-stroke-width': 1,
            // @ts-ignore
            'circle-stroke-color': ['case'].concat(...strokeColors).concat(['rgba(0, 0, 0, 0)']),
        },
    };

    return (
        <>
            <Source generateId id="ekb-dtp-source" type="geojson" data={data}>
                <Layer {...layerStyle} />
            </Source>
        </>
    );
}
