export interface Image {
    id: string;
    s: ImageParameters;
    m?: ImageParameters;
}

export interface ImageParameters {
    width: string | number;
    height: string | number;
    src: string;
}

export type Point = [number, number];
