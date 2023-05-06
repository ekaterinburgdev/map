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
        description: 'Объект культурного наследия и\u00A0неотделимая от\u00A0него территория',
    },
    {
        color: '#00b4ff',
        label: OknAreaType.SecurityZone,
        description:
            'Территории, в\u00A0пределах которых запрещены любые работы, так как они могут причинить вред объекту',
    },
    {
        color: '#e800b5',
        label: OknAreaType.ProtectZone,
        description:
            'Временная зона в\u00A0100\u2013250 метров вокруг объекта, у\u00A0которого пока не\u00A0указана зона охраны',
    },
];
