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

export type Point = [
    number,
    number,
];

export interface Zone {
    polyline: Point[];
}

export interface Area {
    zones: Zone[];
}
