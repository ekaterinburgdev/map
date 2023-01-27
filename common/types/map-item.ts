/* eslint-disable */

export type MapItemImageSize = {
    width: number;
    height: number;
    src: string;
};

export type MapItemImage = {
    title: string;
    url: string;
};

export enum MapItemType {
    DesignCode = 'design-code',
    DTP = 'dtp',
    Houses = 'houses',
    Lines = 'lines',
    OKN = 'okn',
}
