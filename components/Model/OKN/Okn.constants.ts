import { OknAreaType, OknObjectSignificanceType } from 'common/data/okn/oknConstants';

export const OBJECTS_CONFIG = {
    [OknObjectSignificanceType.Federal]: {
        color: '#e65000',
    },
    [OknObjectSignificanceType.Regional]: {
        color: '#ae00ff',
    },
    [OknObjectSignificanceType.Municipal]: {
        color: '#03a600',
    },
};

export const AREA_CONFIG = {
    [OknAreaType.ObjectZone]: {
        color: '#ff640f',
        description: 'Объект культурного наследия и\u00A0неотделимая от\u00A0него территория',
    },
    [OknAreaType.SecurityZone]: {
        color: '#00b4ff',
        description:
            'Территории, в\u00A0пределах которых запрещены любые работы, так как они могут причинить вред объекту',
    },
    [OknAreaType.ProtectZone]: {
        color: '#e800b5',
        description:
            'Временная зона в\u00A0100\u2013250 метров вокруг объекта, у\u00A0которого пока не\u00A0указана зона охраны',
    },
};
