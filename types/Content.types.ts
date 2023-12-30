export enum MapItemType {
    DesignCode = 'designCode',
    DTP = 'dtp',
    Houses = 'houses',
    RedLines = 'redLines',
    PinkLines = 'pinkLines',
    BlueLines = 'blueLines',
    OKN = 'okn',
    Quarter = 'quarter',
}

export type ContentConfig = Record<
    MapItemType,
    {
        cardContent: ({ placemark }: { placemark: any }) => JSX.Element;
        oneItemRequest: (id: string) => Promise<any>;
    }
>;
