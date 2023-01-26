import React, { useCallback, useMemo } from 'react';
import { Polygon } from 'react-leaflet';

import { ShapeProps } from './Shape.types';

export function Shape({
    color,
    positions,
    fillOpacity = 1,
    openModal,
    id,
    type,
    weight = 0,
    dashed,
}: ShapeProps) {
    const onClickHandler = useCallback(() => openModal(id, type), [id, type, openModal]);
    const eventHandlers = useMemo(
        () => ({
            click: onClickHandler,
        }),
        [onClickHandler],
    );

    return (
        <Polygon
            eventHandlers={eventHandlers}
            positions={positions}
            pathOptions={{
                color,
                weight,
                fillOpacity,
                dashArray: dashed ? '8 8 8' : undefined,
            }}
        />
    );
}
