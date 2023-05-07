export enum LineType {
    RedLine = 'Красная линия',
    BlueLine = 'Синяя линия',
    PurpleLine = 'Фиолетовая линия',
}

export interface LineObject {
    id: number;
    attributes: {
        iconCaption: string;
        description: null | string;
        geometry: {
            id: string;
            coordinates: [lat: number, lng: number];
            type?: string;
        };
        image?: string;
    };
}
