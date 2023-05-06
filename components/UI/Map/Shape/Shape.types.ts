import { PolygonProps } from 'react-leaflet';
import { MapItemType } from 'common/types/map-item';

export type ShapeProps = {
    color: string;
    fillOpacity?: number;
    positions: PolygonProps['positions'];
    openModal?: (id: string, type: MapItemType) => void;
    id: string;
    type: MapItemType;
    weight?: number;
    dashed?: boolean;
};
