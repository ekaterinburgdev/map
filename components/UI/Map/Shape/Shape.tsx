import React from 'react';
import { Polygon } from 'react-leaflet';

import { ShapeProps } from './Shape.types';

export function Shape({ color, positions, fillOpacity = 1 }: ShapeProps) {
    return (
        <Polygon
            positions={positions}
            pathOptions={{
                color,
                weight: 6,
                fillOpacity,
            }}
        />
    );
}
