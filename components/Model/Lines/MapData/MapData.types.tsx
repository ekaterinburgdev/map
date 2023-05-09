import { PolylineProps } from 'react-leaflet';

import { LineType } from 'common/data/lines/lineType';

export type LinesMapDataProps = {
    lineType: LineType;
    id: number;
} & (
    | {
        figureType: 'point';
        positions: [number, number] | [number, number][];
        preview?: string;
    }
    | {
        figureType: 'line';
        positions: PolylineProps['positions'];
    }
);
