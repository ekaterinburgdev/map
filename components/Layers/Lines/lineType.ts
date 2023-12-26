export enum LineType {
  RedLine = 'Красная линия',
  BlueLine = 'Синяя линия',
  PurpleLine = 'Фиолетовая линия',
}

export interface LineObject {
  properties: {
    id: number;
    title?: string;
    description: null | string;
  };
  geometry: {
    id: string;
    coordinates: [lat: number, lng: number];
    type?: string;
  };
}
