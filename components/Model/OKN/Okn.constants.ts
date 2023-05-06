import { OknAreaType, OknObjectSignificanceType } from 'common/data/okn/oknConstants';

export const OBJECTS_CONFIG = [
    { color: '#8d0b00', label: OknObjectSignificanceType.Federal },
    { color: '#60008d', label: OknObjectSignificanceType.Regional },
    { color: '#027000', label: OknObjectSignificanceType.Municipal },
];

export const AREA_CONFIG = [
    {
        color: '#ff640f',
        label: OknAreaType.ObjectZone,
        description: 'Объект культурного наследия и неотделимая от него территория',
    },
    {
        color: '#00b4ff',
        label: OknAreaType.SecurityZone,
        description:
            'Территории, в пределах которых запрещены любые работы, так как они могут причинить вред объекту',
    },
    {
        color: '#e800b5',
        label: OknAreaType.ProtectZone,
        description:
            'Временная зона в 100-250 метров вокруг объекта, у которого пока не указана зона охраны',
    },
];
