import { MapItem } from 'common/types/map-item';

export type HeaderProps = {
    coordinates: MapItem['coords'];
    title: string;
    description?: string;
};
