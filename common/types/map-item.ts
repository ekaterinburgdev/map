/* eslint-disable */

import type { LatLngExpression } from 'leaflet';

export enum MapItemType {
    'Логотипы и айдентика',
    'Навигационные стелы',
    'Таблички ОКН',
    'Таблички ЧО',
    'Обычные адресные таблички',
    'Фризы остановок',
    'Светофор',
    'Исторические адресные таблички',
    'Уличная мебель',
    'Памятные таблички',
    'Транспорт',
    'Настенные таблички',
}

export type MapItemImageSize = {
    width: number;
    height: number;
    src: string;
};

export type MapItemImage = {
    id: string;
    m: MapItemImageSize;
    s: MapItemImageSize;
};

export type MapItem = {
    id: string;
    name: string;
    type: MapItemType;
    coords: LatLngExpression;
    street: string;
    date?: number;
    description: string;
    images: MapItemImage[];
    preview: MapItemImage;
};
