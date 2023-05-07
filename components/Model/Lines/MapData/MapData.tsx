import React, { useMemo } from 'react';

import { Line } from 'components/UI/Map/Line/Line';
import { Point, Sizes } from 'components/UI/Map/Point';

import { MapItemType } from 'common/types/map-item';

import { LINES_CONFIG } from '../Lines.constants';

import { LinesMapDataProps } from './MapData.types';

// @ts-ignore
export function LinesMapData({ id, lineType, figureType, positions, preview }: LinesMapDataProps) {
    const color = useMemo(() => LINES_CONFIG[lineType].color, [lineType]);

    return figureType === 'point' ? (
        <>
            {Array.isArray(positions[0]) ? (
                positions.map((position) => (
                    <Point
                        id={id.toString()}
                        position={position}
                        color={color}
                        key={id}
                        preview={preview}
                        size={Sizes.S}
                        type={MapItemType.Lines}
                    />
                ))
            ) : (
                <Point
                    id={id.toString()}
                    position={positions as [number, number]}
                    color={color}
                    key={id}
                    preview={preview}
                    size={Sizes.S}
                    type={MapItemType.Lines}
                />
            )}
        </>
    ) : (
        <Line positions={positions} color={color} key={id} />
    );
}
