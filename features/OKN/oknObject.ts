import { OknObjectSignificanceType } from './oknConstants';

export interface OknObject {
    properties: OknProperties;
    geometry: OknGeometry;
}

export interface OknProperties {
    id: number;
    name: string;
    address: string;
    okn_number: string;
    date: string;
    type: string;
    category: OknObjectSignificanceType;
    img?: { url: string; title: string; preview?: string };
    document: {
        archive: { id: number; url: string };
        date: string;
        name: string;
        number: string;
    }[];
    isExist?: string;
    comment?: string;
}

export interface OknGeometry {
    coordinates: [lat: number, lng: number];
    type?: string;
}
