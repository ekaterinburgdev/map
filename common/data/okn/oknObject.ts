import { OknObjectSignificanceType } from './oknConstants';

export interface OknObject {
    id: string;
    attributes: OknAttributes;
}

export interface OknObjectWithGeometry {
    id: string;
    attributes: OknAttributesWithGeometry;
}

export interface OknAttributes {
    name: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    okn_number: string;
    date: string;
    type: string;
    category: OknObjectSignificanceType;
    img?: { url: string; title: string };
    document: {
        archive:
        { id: number; url: string };
        date: string; name: string;
        number: string }[];
    isExist?: string;
    comment?: string;
    CoordinatesHash: string;
}

export interface OknAttributesWithGeometry extends OknAttributes {
    geometry: OknGeometry;
}

export interface OknGeometry {
    id: string;
    coordinates: [lat: number, lng: number];
    type?: string;
}
