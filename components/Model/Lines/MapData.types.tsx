import { PolylineProps } from 'react-leaflet';

export type LinesMapDataProps = {
    data: {
        lines: { positions: PolylineProps['positions']; color: string }[];
        points: { position: [number, number]; color: string; id: string }[];
    };
};
