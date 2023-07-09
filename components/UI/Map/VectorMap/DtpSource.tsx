import React from 'react';
import { Source, Layer } from 'react-map-gl';
import type { CircleLayer } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterSelector, activeFilterParamsSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { SEVERITY_CONFIG } from 'components/Model/DTP/DTP.constants';
import dtp from '../../../../public/ekb-dtp.json';

export function DtpSource() {
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

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
        id: 'point',
        type: 'circle',
        source: 'ekb-dtp-source',
        paint: {
            'circle-radius': 8,
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
            <Source id="ekb-dtp-source" type="geojson" data={data}>
                <Layer {...layerStyle} />
            </Source>
        </>
    );
}
