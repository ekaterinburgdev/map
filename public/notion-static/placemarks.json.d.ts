import type { MapItem } from '../../common/types/map-item';

declare module 'public/notion-static/placemarks.json' {
    declare const PlacemarkData: MapItem[];
    export default PlacemarkData;
}
