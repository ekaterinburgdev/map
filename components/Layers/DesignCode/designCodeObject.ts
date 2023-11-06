import { Image } from 'types/objectsBase';

export enum DesignCodeItemType {
    LogosAndIdentic = 'Логотипы и айдентика',
    NavigationStela = 'Навигационные стелы',
    OKN = 'Таблички ОКН',
    ChoPlate = 'Таблички ЧО',
    AddressPlate = 'Обычные адресные таблички',
    StopFreeze = 'Фризы остановок',
    TrafficLight = 'Светофор',
    HistoricAddressPlate = 'Исторические адресные таблички',
    StreetFurniture = 'Уличная мебель',
    CommemorativePlaque = 'Памятные таблички',
    Transport = 'Транспорт',
    WallPlate = 'Настенные таблички',
    ColumnsWithArrows = 'Столбы со стрелками',
}

export interface DesignCodeObject {
    id: string;
    name: string;
    type: DesignCodeItemType;
    description: string;
    coords: [lat: number, lng: number];
    street: string;
    images: Image[];
    preview: Image;
}
