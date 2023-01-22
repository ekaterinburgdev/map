import { PolylineProps } from 'react-leaflet';

export type LineProps = {
    color: string;
    positions: PolylineProps['positions'];
};