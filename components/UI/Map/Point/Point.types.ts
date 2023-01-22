import L from 'leaflet';

import { IMapContext } from '../providers/MapProvider';

export enum Sizes {
    S = 's',
    M = 'm',
};

export interface PointProps {
    position: L.LatLngExpression;
    preview?: string | null;
    color?: string,
    size?: Sizes,
    isOpen?: boolean;
    openPopup?: IMapContext['openPopup'];
    closePopup?: IMapContext['closePopup'];
    id: string;
}