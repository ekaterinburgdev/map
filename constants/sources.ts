import { SourceType, SourcesConfig } from 'types/Sources.types';

export const SOURCES_BY_TYPE: SourcesConfig = {
    [SourceType.osm]: {
        name: 'OpenStreetMap',
        link: 'https://www.openstreetmap.org/',
        data: null,
    },
    [SourceType.okn]: {
        name: 'Объекты культурного наследия Свердловской области',
        link: 'https://okn.midural.ru/kategorii/obekty-kulturnogo-naslediya-sverdlovskoy-oblasti',
        data: null,
    },
    [SourceType.howoldthishouse]: {
        name: 'Карта возраста домов',
        link: 'https://how-old-is-this.house/',
        data: 'https://how-old-is-this.house/dataset?p=h-ekb',
    },
    [SourceType.domaekb]: {
        name: 'Жилые дома Екатеринбурга',
        link: 'https://domaekb.ru',
        data: null,
    },
    [SourceType.mingkh]: {
        name: 'МинЖКХ',
        link: 'https://mingkh.ru',
        data: null,
    },
    [SourceType.ekaterinburgdesign]: {
        name: 'Дизайн-код Ектеринбурга',
        link: 'https://ekaterinburg.design',
        data: 'https://ekaterinburg.design',
    },
    [SourceType.dtp]: {
        name: 'Карта ДТП',
        link: 'https://dtp-stat.ru/',
        data: 'https://dtp-stat.ru/opendata',
    },
    [SourceType.ekb_quarter]: {
        name: 'екатеринбург.рф',
        link: 'https://екатеринбург.рф/справка/квартальные',
        data: null,
    },
    [SourceType.design_objects_map]: {
        name: 'Карта объектов «Дизайн-кода»',
        link: 'https://map.ekaterinburg.design',
        data: 'https://map.ekaterinburg.design',
    },
};
