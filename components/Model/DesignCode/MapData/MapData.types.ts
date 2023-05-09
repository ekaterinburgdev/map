import { LatLngExpression } from 'leaflet';

import { Image } from 'common/data/base/objectsBase';

export interface DesignCodeMapDataProps {
    id: string;
    coords: LatLngExpression;
    type: string;
    preview: Image;
    name: string;
}
