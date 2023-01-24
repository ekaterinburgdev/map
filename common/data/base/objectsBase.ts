export interface Image {
    id: string;
    s: ImageParameters;
    m?: ImageParameters;
}

export interface ImageParameters {
    width: string;
    height: string;
    src: string;
}

export interface Point {
    lat: string,
    lng: string,
}

export interface Zone {
    polyline: Point[];
}

export interface Area {
    zones: Zone[];
}
