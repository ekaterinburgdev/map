export const SOURCES_BY_TYPE = {
  osm: {
    name: 'OpenStreetMap',
    link: 'https://www.openstreetmap.org/',
    data: null,
  },
  okn: {
    name: 'Объекты культурного наследия Свердловской области',
    link: 'https://okn.midural.ru/kategorii/obekty-kulturnogo-naslediya-sverdlovskoy-oblasti',
    data: null,
  },
  howoldthishouse: {
    name: 'Карта возраста домов',
    link: 'https://how-old-is-this.house/',
    data: 'https://how-old-is-this.house/dataset?p=h-ekb',
  },
  domaekb: {
    name: 'Жилые дома Екатеринбурга',
    link: 'https://domaekb.ru',
    data: null,
  },
  mingkh: {
    name: 'МинЖКХ',
    link: 'https://mingkh.ru',
    data: null,
  },
  ekaterinburgdesign: {
    name: 'Дизайн-код Ектеринбурга',
    link: 'https://ekaterinburg.design',
    data: 'https://ekaterinburg.design',
  },
  dtp: {
    name: 'Карта ДТП',
    link: 'https://dtp-stat.ru/',
    data: 'https://dtp-stat.ru/opendata',
  },
  ekb_quarter: {
    name: 'екатеринбург.рф',
    link: 'https://екатеринбург.рф/справка/квартальные',
    data: null,
  },
  design_objects_map: {
    name: 'Карта объектов «Дизайн-кода»',
    link: 'https://map.ekaterinburg.design',
    data: 'https://map.ekaterinburg.design',
  },
} as const;
