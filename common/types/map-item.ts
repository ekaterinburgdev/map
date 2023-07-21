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
    DesignCode = 'designCode',
    DTP = 'dtp',
    Houses = 'houses',
    RedLines = 'redLines',
    PinkLines = 'pinkLines',
    BlueLines = 'blueLines',
    OKN = 'okn',
}
