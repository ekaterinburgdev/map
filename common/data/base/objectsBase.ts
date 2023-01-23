export interface Image{
    id: string;
    s: ImageParameters;
    m?: ImageParameters;
}

export interface ImageParameters{
    width: string;
    height: string;
    src: string;
}