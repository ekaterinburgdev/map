import React from 'react';

import { Line } from 'components/UI/Map/Line/Line';
import { Point, Sizes } from 'components/UI/Map/Point';

import { MapItemType } from 'common/types/map-item';
import { LinesMapDataProps } from './MapData.types';

export function LinesMapData({ data }: LinesMapDataProps) {
    const { lines, points } = data;

    return (
        <>
            {lines.map((line, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Line positions={line.positions} color={line.color} key={idx} />
            ))}
            {points.map((point) => (
                <Point
                    id={point.id}
                    position={point.position}
                    color={point.color}
                    size={Sizes.S}
                    key={String(point.position)}
                    type={MapItemType.Lines}
                />
            ))}
        </>
    );
}
