import React, { useEffect } from 'react';
import { Source, Layer, useMap } from 'react-map-gl';
import type { CircleLayer, HeatmapLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'types/Filters.types';
import { SEVERITY_CONFIG } from 'features/DTP/DTP.constants';
import { MapItemType } from 'types/Content.types';
import { MAX_ZOOM, MIN_ZOOM } from 'constants/map';
import dtp from 'public/ekb-dtp.json';
import { usePopup } from 'features/Map/providers/usePopup';
import useMapObjectState from 'features/Map/helpers/useMapObjectState';

const DTP_LAYER_ID = 'dtp-point';
const DTP_LAYER_HEATMAP_ID = 'dtp-point-heatmap';

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
            // @ts-ignore
            'circle-color': ['case'].concat(...colors).concat(['rgba(0, 0, 0, 0)']),
            'circle-stroke-width': 1,
            // @ts-ignore
            'circle-stroke-color': ['case'].concat(...strokeColors).concat(['rgba(0, 0, 0, 0)']),
            'circle-radius': ['interpolate', ['linear'], ['zoom'], MIN_ZOOM, 1, MAX_ZOOM, 12],
        },
    };

    const heatmapStyle: HeatmapLayer = {
        id: DTP_LAYER_HEATMAP_ID,
        source: 'ekb-dtp-source',
        type: 'heatmap',
        paint: {
            'heatmap-weight': {
                type: 'exponential',
                property: 'weight',
                stops: [
                    [0, 0],
                    [1, 1],
                ],
            },
            'heatmap-intensity': 1,
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(0, 0, 255, 0)',
                0.2,
                'rgb(0, 255, 0)',
                0.4,
                'rgb(255, 255, 0)',
                0.6,
                'rgb(255, 0, 0)',
                1,
                'rgb(255, 0, 0)',
            ],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], MIN_ZOOM, 2, MAX_ZOOM, 50],
            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], MIN_ZOOM, 1, MAX_ZOOM, 0],
        },
    };

    return (
        <>
            <Source generateId id="ekb-dtp-source" type="geojson" data={data}>
                <Layer {...layerStyle} />
                <Layer {...heatmapStyle} />
            </Source>
        </>
    );
}
