import { PolygonProps } from 'react-leaflet';

export type ShapeProps = {
    color: string;
    fillOpacity?: number;
    positions: PolygonProps['positions'];
};
