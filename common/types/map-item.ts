/* eslint-disable */

import type { LatLngExpression } from 'leaflet';

export type MapItemImageSize = {
    width: number;
    height: number;
    src: string;
};

export type MapItemImage = {
    title: string;
    url: string;
};

export type MapItem = {
    id: string;
    name: string;
    type: MapItemType;
    coords: LatLngExpression | LatLngExpression[];
    street: string;
    date?: string;
    description: string;
    images: MapItemImage[];
    preview?: MapItemImage;
    address?: string;
    oknNumber?: string;
    isExist?: string;
    condition?: string;
    company?: string;
    wearTear?: string;
    series?: string;
    floors?: string;
    borders: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
};

export enum MapItemType {
    DesignCode = 'design-code',
    DTP = 'dtp',
    Houses = 'houses',
    Lines = 'lines',
    OKN = 'okn',
}
