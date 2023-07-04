import L from 'leaflet';

import { MapItemType } from 'common/types/map-item';

import { IMapContext } from '../providers/MapProvider';

export type TOpenClosed = {
    open: number;
    closed: number;
};

export enum Sizes {
    XS = 'xs',
    S = 's',
    M = 'm',
}

export interface PointProps {
    position: L.LatLngExpression;
    preview?: string | null;
    color?: string;
    size?: Sizes;
    isOpen?: boolean;
    name?: string;
    openPopup?: IMapContext['openPopup'];
    closePopup?: IMapContext['closePopup'];
    id: string;
    type: MapItemType;
}
