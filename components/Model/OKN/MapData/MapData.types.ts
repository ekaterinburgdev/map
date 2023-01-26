import { LatLngExpression } from 'leaflet';

export type OKNMapDataProps = {
    id: string;
    coords: LatLngExpression[] | LatLngExpression;
};
