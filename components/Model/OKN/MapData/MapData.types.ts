import { LatLngExpression } from 'leaflet';

import { OknAreaType, OknObjectSignificanceType } from 'common/data/okn/oknConstants';

export type OKNMapDataProps = {
    id: string;
    coords: LatLngExpression[] | LatLngExpression;
    unclickable?: boolean;
    type: OknAreaType | OknObjectSignificanceType;
    preview?: string;
};
