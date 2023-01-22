import React from 'react';
import { Polyline } from 'react-leaflet';

import { LineProps } from './Line.types';

export const Line = ({ color, positions }: LineProps) => {
    return (
        <Polyline
            positions={positions}
            pathOptions={{
                color,
                weight: 6,
            }}
        />
    );
};