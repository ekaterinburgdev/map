import React from 'react';

import { PolylineProps } from 'react-leaflet';
import { Line } from 'components/UI/Map/Line/Line';

import { RED_LINE_MOCK } from './red-line-mock';
import { Point, Sizes } from 'components/UI/Map/Point';

export type LinesMapDataProps = {
    data: {
        lines?: { positions: PolylineProps['positions'], color: string }[];
        points?: { position: [number, number], color: string, id: string }[];
    };
};

export const LinesMapData = ({ data }: LinesMapDataProps) => {
    const { 
        lines = 
            [{ positions: [RED_LINE_MOCK], color: '#E31E24' }],
        points = [{
            position: [
                56.83508212290889,
                60.61074932672987
            ],
            color: '#E31E24',
            id: '123',
        }] 
    } = data;

    return (
        <>
            {lines.map(
                (line, idx) => <Line positions={line.positions} color={line.color} key={idx} />
            )}
            {points.map(
                point => (
                    <Point
                        id={point.id}
                        position={point.position}
                        color={point.color}
                        size={Sizes.S}
                        key={String(point.position)}
                    />
                )
            )}
        </>
    );
};