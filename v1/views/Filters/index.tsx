// @ts-nocheck
/* eslint-disable */
import React, { useCallback } from 'react';
import { useMap } from 'react-map-gl';
import { RangeHistogram } from 'components/UI/RangeHistogram';
import {
    CURRENT_YEAR,
    EKATERINBURG_FOUNDATION_YEAR,
} from 'components/Model/Houses/Filter/Age/HouseAgeFilter.constants';
import { HistogramData, MinMax } from 'components/UI/RangeHistogram/types';
import { Loader } from 'components/UI/Loader/Loader';

interface Props {
    loading: boolean;
    field: string;
    rangeData: HistogramData;
}

export function OsmBuildingFilter({ loading, field, rangeData }: Props) {
    const { ekbMap } = useMap();

    const onChange = useCallback(
        (range: MinMax) => {
            const map = ekbMap?.getMap?.();

            if (map && map?.getStyle) {
                const colors = rangeData
                    .map((item) => {
                        if (item.from >= range.min && item.to <= range.max) {
                            return item;
                        }
                        return { ...item, color: '#0c1021' };
                    })
                    .map((item) => [item.from, item.color])
                    .flat(2);

                const newStyle = {
                    ...map.getStyle(),
                    layers: map.getStyle().layers.map((layer) => {
                        if (layer.id === 'building') {
                            return {
                                ...layer,
                                paint: {
                                    ...layer.paint,
                                    'fill-extrusion-color': [
                                        'interpolate',
                                        ['linear'],
                                        ['to-number', ['get', field]],
                                    ].concat(colors),
                                },
                            };
                        }
                        return layer;
                    }),
                };
                map.setStyle(newStyle);
            }
        },
        [rangeData, ekbMap, field],
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <RangeHistogram
            data={rangeData}
            onChange={onChange}
            width={368}
            height={28}
            defaultMin={EKATERINBURG_FOUNDATION_YEAR}
            defaultMax={CURRENT_YEAR}
        />
    );
}
