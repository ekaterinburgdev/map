export const SOURCES_BY_TYPE = {
    okn: {
        name: 'Объекты культурного наследия Свердловской области',
        link: 'https://okn.midural.ru/kategorii/obekty-kulturnogo-naslediya-sverdlovskoy-oblasti',
        data: null,
    },
    howoldthishouse: {
        name: 'Карта возраста домов',
        link: 'https://how-old-is-this.house/',
        data: 'https://how-old-is-this.house/dataset?p=h-menu',
    },
    domaekb: {
        name: 'Жилые дома Екатеринбурга',
        link: 'https://domaekb.ru',
        data: null,
    },
    mingkh: {
        name: 'МинЖКХ Екатеринбурга',
        link: 'https://mingkh.ru',
        data: null,
    },
    ekaterinburgdesign: {
        name: 'Дизайн-код Ектеринбурга',
        link: 'https://ekaterinburg.design',
        data: 'https://map.ekaterinburg.design/api/map',
    },
    dtp: {
        name: 'Карта ДТП',
        link: 'https://dtp-stat.ru/',
        data: 'https://dtp-stat.ru/opendata',
    },
} as const;
