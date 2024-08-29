import { ICopyright, InputSloyLayer, InputSloySource, getLayerStateStyle } from 'sloy-map';
import facades from '../public/ekb-facades.json';

const MIN_ZOOM = 7;

const MAX_ZOOM = 20;

const EKB_VIEW = {
    center: [60.6099, 56.83898],
    zoom: 14.5,
    pitch: 0,
    bearing: 0,
};

export const defaultMapState = {
    initialViewState: {
        ...EKB_VIEW,
        longitude: EKB_VIEW.center[0],
        latitude: EKB_VIEW.center[1],
    },
    mapStyle: 'https://sloy.io/ekb/style.json',
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    // maxBounds: [40.721512, 37.51153, 49.609451, 42.222066],
};

export const defaultSources: InputSloySource[] = [
    {
        id: 'osmBuilding',
        copyright: ['osm', 'howoldthishouse', 'domaekb', 'mingkh'],
        type: 'vector-tiles',
        card: {
            title: ['addr:street', 'addr:housenumber'],
            blocks: [
                { type: 'value', id: 'addr:street2' },
                { type: 'value', id: 'addr:housenumber2' },
                { type: 'divider' },
                { type: 'value', id: 'name' },
                { type: 'value', id: 'official_name:ru' },
                { type: 'value', id: 'building:management' },
                { type: 'value', id: 'operator' },
                { type: 'value', id: 'addr:postcode' },
                { type: 'divider' },
                { type: 'value', id: 'building:levels' },
                { type: 'value', id: 'building:height' },
                { type: 'divider' },
                { type: 'value', id: 'building:year' },
                { type: 'age', id: 'building:age', deps: 'building:year' },
                { type: 'value', id: 'building:series' },
                { type: 'value', id: 'architect' },
                { type: 'value', id: 'building:architecture' },
                { type: 'value', id: 'building:material' },
                { type: 'value', id: 'building:colour' },
                { type: 'value', id: 'roof:shape' },
                { type: 'divider' },
                { type: 'value', id: 'building:health' },
                { type: 'value', id: 'building:condition' },
                { type: 'value', id: 'building:emergency' },
                { type: 'divider' },
                { type: 'value', id: 'email' },
                { type: 'value', id: 'phone' },
                { type: 'value', id: 'website' },
                { type: 'value', id: 'contact:website' },
            ],
        },
        properties: [
            {
                title: 'Когда построили',
                id: 'building:year',
                range: [
                    { from: 1723, to: 1860, color: '#ff7461', value: 145 },
                    { from: 1860, to: 1917, color: '#ffA34e', value: 263 },
                    { from: 1917, to: 1930, color: '#fee678', value: 504 },
                    { from: 1930, to: 1940, color: '#85e634', value: 718 },
                    { from: 1940, to: 1955, color: '#0f9467', value: 2610 },
                    { from: 1955, to: 1991, color: '#71b3ff', value: 11895 },
                    { from: 1991, to: 2010, color: '#c270ff', value: 3813 },
                    { from: 2010, to: 2023, color: '#f97bcf', value: 2807 },
                ],
            },
            {
                title: 'Количество этажей',
                id: 'building:levels',
                range: [
                    { from: 1, to: 3, color: '#006adb', value: 10683 },
                    { from: 3, to: 5, color: '#0084e2', value: 2256 },
                    { from: 5, to: 9, color: '#009ee1', value: 3399 },
                    { from: 9, to: 12, color: '#00b7d9', value: 2115 },
                    { from: 12, to: 16, color: '#00cfc5', value: 680 },
                    { from: 16, to: 21, color: '#00e7a3', value: 801 },
                    { from: 21, to: 25, color: '#72f674', value: 118 },
                    { from: 25, to: 31, color: '#c0fc49', value: 282 },
                    { from: 31, to: 52, color: '#ffea00', value: 42 },
                ],
            },
            {
                title: 'Износ',
                id: 'building:health',
                range: [
                    { from: 0, to: 10, color: '#006b29', value: 742 },
                    { from: 10, to: 20, color: '#24782a', value: 1129 },
                    { from: 20, to: 30, color: '#73a426', value: 1246 },
                    { from: 30, to: 40, color: '#b6c718', value: 834 },
                    { from: 40, to: 50, color: '#e9e005', value: 584 },
                    { from: 50, to: 60, color: '#ffea00', value: 284 },
                    { from: 60, to: 70, color: '#ffdc00', value: 176 },
                    { from: 70, to: 80, color: '#ffbb00', value: 35 },
                    { from: 80, to: 90, color: '#ff8a00', value: 5 },
                    { from: 90, to: 100, color: '#ff0000', value: 0 },
                ],
            },
            {
                id: 'building:facade',
            },
            {
                title: 'Osm ID',
                id: 'osm:id',
            },
            {
                title: 'Улица',
                id: 'addr:street',
            },
            {
                title: 'Номер дома',
                id: 'addr:housenumber',
            },
            {
                title: 'Вторая улица',
                id: 'addr:street2',
            },
            {
                title: 'Второй номер дома',
                id: 'addr:housenumber2',
            },
            {
                title: 'Управляющая компания',
                id: 'building:management',
            },
            {
                title: 'Серия дома',
                id: 'building:series',
            },
            {
                title: 'Состояние',
                id: 'building:condition',
            },
            {
                title: 'Аварийность',
                id: 'building:emergency',
            },
            {
                title: 'Возраст здания',
                id: 'building:age',
                deps: 'building:year',
            },
            {
                title: 'Название',
                id: 'name',
            },
            {
                title: 'Официальное название',
                id: 'official_name:ru',
            },
            {
                title: 'Почтовый индекс',
                id: 'addr:postcode',
            },
            {
                title: 'Управляющая компания',
                id: 'building:management',
            },
            {
                title: 'Оператор',
                id: 'operator',
            },
            {
                title: 'Время работы',
                id: 'opening_hours',
            },
            {
                title: 'Тип здания',
                id: 'building',
            },
            {
                title: 'Высота, м',
                id: 'building:height',
            },
            {
                title: 'Архитектор',
                id: 'architect',
            },
            {
                title: 'Архитектурный стиль',
                id: 'building:architecture',
            },
            {
                title: 'Материал',
                id: 'building:material',
            },
            {
                title: 'Цвет фасада',
                id: 'building:colour',
            },
            {
                title: 'Форма крыши',
                id: 'roof:shape',
            },
            {
                title: 'Электронная почта',
                id: 'email',
            },
            {
                title: 'Телефон',
                id: 'phone',
            },
            {
                title: 'Сайт',
                id: 'website',
            },
            {
                title: 'Сайт',
                id: 'contact:website',
            },
        ],
    },
    {
        id: 'ekbLinesSource',
        path: '/ekb-color-lines.json',
        type: 'geojson',
        card: { blocks: [] },
        copyright: [],
        properties: [
            {
                id: 'type',
                values: {
                    'Красная линия': {
                        color: '#e31e24',
                        description: 'Маршрут по\u00A0историческому центру города',
                    },
                    'Синяя линия': {
                        color: '#189eda',
                        description: 'Маршрут по\u00A0местам, связанным с\u00A0царской семьей',
                    },
                    'Фиолетовая линия': {
                        color: '#9747ff',
                        description: 'Арт-объекты фестиваля уличного искусства «Стенограффия»',
                    },
                },
            },
        ],
    },
    {
        id: 'ekbPointsSource',
        type: 'geojson',
        copyright: [],
        path: '/ekb-color-points.json',
        card: {
            title: 'title',
            blocks: [
                {
                    type: 'action-link',
                    id: 'description',
                    content: 'Подробнее об объекте',
                },
            ],
        },
        properties: [
            {
                id: 'description',
                title: 'Описание',
            },
            {
                id: 'type',
                values: {
                    'Красная линия': {
                        color: '#e31e24',
                        description: 'Маршрут по\u00A0историческому центру города',
                    },
                    'Синяя линия': {
                        color: '#189eda',
                        description: 'Маршрут по\u00A0местам, связанным с\u00A0царской семьей',
                    },
                    'Фиолетовая линия': {
                        color: '#9747ff',
                        description: 'Арт-объекты фестиваля уличного искусства «Стенограффия»',
                    },
                },
            },
        ],
    },
    {
        id: 'ekbDesigncodeSource',
        type: 'json',
        coordsProperty: 'coords',
        isCoordsReverse: true,
        path: 'https://map.ekaterinburg.design/api/map',
        copyright: ['ekbDesignCode'],
        card: {
            title: 'name',
            cover: 'preview.m.src',
            rootSrc: 'https://map.ekaterinburg.design',
            description: 'description',
            additionalInfo: ['street'],
            blocks: [{ type: 'tag', id: 'type' }, { type: 'divider' }],
        },
        properties: [
            {
                id: 'type',
                title: 'Тип',
                values: {
                    'Обычные адресные таблички': { color: '#ff640a' },
                    'Таблички ЧО': { color: '#e63223' },
                    'Памятные таблички': { color: '#f758b6' },
                    'Исторические адресные таблички': { color: '#aa9b46' },
                    'Логотипы и айдентика': { color: '#00b400' },
                    'Навигационные стелы': { color: '#ffd400' },
                    'Таблички ОКН': { color: '#00b4ff' },
                    'Фризы остановок': { color: '#55647d' },
                    'Уличная мебель': { color: '#5820e4' },
                    Светофор: { color: '#965a14' },
                    Транспорт: { color: '#006d4e' },
                    'Настенные таблички': { color: '#a00041' },
                    'Столбы со стрелками': { color: '#86e621' },
                },
            },
        ],
    },
    {
        id: 'ekbOknSource',
        type: 'geojson',
        path: '/ekb-okn.json',
        copyright: ['okn'],
        card: {
            title: 'name',
            additionalInfo: ['address'],
            cover: 'preview.m.src',
            blocks: [
                { type: 'value', id: 'date' },
                { type: 'age', id: 'age', deps: 'date' },
            ],
        },
        properties: [
            {
                title: 'Номер',
                id: 'okn_number',
            },
            {
                id: 'date',
                title: 'Когда построили',
            },
            {
                id: 'age',
                title: 'Возраст здания',
                deps: 'date',
            },
            {
                id: 'category',
                values: {
                    'Федерального значения': { color: '#e65000' },
                    'Регионального значения': { color: '#ae00ff' },
                    'Местного (муниципального) значения': { color: '#03a600' },
                },
            },
        ],
    },
    {
        id: 'ekbOknProtectZoneSource',
        type: 'geojson',
        card: { blocks: [] },
        properties: [],
        path: '/ekb-okn-protect.json',
        copyright: ['okn'],
    },
    {
        id: 'ekbOknSecurityZoneSource',
        type: 'geojson',
        card: { blocks: [] },
        properties: [],
        path: '/ekb-okn-security.json',
        copyright: ['okn'],
    },
    {
        type: 'geojson',
        card: { blocks: [] },
        properties: [],
        id: 'ekbOknObjectZoneSource',
        path: '/ekb-okn-objects.json',
        copyright: ['okn'],
    },
    {
        id: 'ekbDtpSource',
        type: 'geojson',
        copyright: ['dtp'],
        card: {
            title: 'category',
            additionalInfo: ['address'],
            blocks: [
                { type: 'datetime', id: 'datetime' },
                { type: 'value', id: 'light' },
                { type: 'string[]', id: 'weather' },
                { type: 'string[]', id: 'road_conditions' },
            ],
        },
        path: '/ekb-dtp.json',
        dataByIdPath: `/api/dtp?id={DATA_BY_ID}`,
        properties: [
            {
                title: 'Вред здоровью',
                id: 'severity',
                values: {
                    Легкий: { color: '#36ccaa' },
                    Тяжёлый: { color: '#fdcf4e' },
                    'С погибшими': { color: '#ff0000' },
                },
            },
            {
                title: 'Время',
                id: 'datetime',
            },
            {
                title: 'Время суток',
                id: 'light',
            },
            {
                title: 'Погода',
                id: 'weather',
            },
            {
                title: 'Дорожные условия',
                id: 'road_conditions',
            },
            {
                title: 'Адресс',
                id: 'address',
            },
            {
                title: 'Участники',
                id: 'participants',
            },
            {
                title: 'Категории',
                id: 'participant_categories',
                type: 'string[]',
            },
            {
                title: 'Количество участникиков',
                id: 'participants_count',
            },
            {
                title: 'Транспортные средства',
                id: 'vehicles',
            },
            {
                title: 'Год',
                id: 'year',
                range: [
                    { from: 2015, to: 2016, value: 1014, color: '#7793db' },
                    { from: 2016, to: 2017, value: 805, color: '#7793db' },
                    { from: 2017, to: 2018, value: 730, color: '#7793db' },
                    { from: 2018, to: 2019, value: 978, color: '#7793db' },
                    { from: 2019, to: 2020, value: 1180, color: '#7793db' },
                    { from: 2020, to: 2021, value: 1114, color: '#7793db' },
                    { from: 2021, to: 2022, value: 1243, color: '#7793db' },
                    { from: 2022, to: 2023, value: 1058, color: '#7793db' },
                ],
            },
        ],
    },
    {
        id: 'ekbQuarterSource',
        type: 'geojson',
        path: '/ekb-quarters.json',
        copyright: ['ekbQuarter'],
        card: {
            title: 'quarterTitle',
            blocks: [
                {
                    type: 'action-link',
                    id: 'url',
                    content: 'Посмотреть телефон и почту квартального',
                },
                { type: 'divider' },
                { type: 'value', id: 'districtTitle' },
            ],
        },
        properties: [
            {
                id: 'districtTitle',
                title: 'Район',
            },
        ],
    },
    {
        id: 'ekbCrimeLayerSource',
        path: '/ekb-crime.json',
        type: 'geojson',
        coordsProperty: 'coords',
        card: {
            title: 'address',
            blocks: [
                // { type: "value", id: "ex_type" },
                { type: 'tag', id: 'exident', title: null },
                { type: 'value', id: 'descrip' },
                { type: 'value', id: 'time' },
                {
                    type: 'datetime',
                    id: 'date',
                    dateTimeFormat: {
                        hour: undefined,
                        minute: undefined,
                    },
                },
                { type: 'value', id: 'link' },
                { type: 'value', id: 'link2' },
            ],
        },
        copyright: [],
        properties: [
            {
                id: 'exident',
                title: 'Тип',
                values: {
                    пожар: { color: '#ff1962' },
                    'коммунальные проблемы': { color: '#dc8a59' },
                    'угон машины': { color: '#a094e7' },
                    кража: { color: '#506856' },
                    'наезд на пешехода': { color: '#439d90' },
                    аномалия: { color: '#02e42f' },
                    беспорядки: { color: '#5860c0' },
                    'территориальный конфликт': { color: '#6286e6' },
                    'нападение или драка': { color: '#a18b00' },
                    поджог: { color: '#ff857b' },
                    труп: { color: '#8189a5' },
                    'ограбление организации': { color: '#5d6de4' },
                    травма: { color: '#b34cae' },
                    вандализм: { color: '#648a30' },
                    убийство: { color: '#b144b2' },
                    'пропал человек': { color: '#3e57d3' },
                    'падение из окна': { color: '#c54485' },
                    самоубийство: { color: '#006789' },
                    'разбой или грабёж': { color: '#009472' },
                    живодёры: { color: '#b7653a' },
                    наркотики: { color: '#b49b38' },
                    изнасилование: { color: '#777409' },
                    'нелегалы или задержания': { color: '#008084' },
                },
            },
            {
                id: 'descrip',
                title: 'Что произошло',
            },
            {
                id: 'time',
                title: 'Время',
            },
            {
                id: 'date',
                title: 'Дата',
            },
            {
                id: 'link',
                title: 'Источник',
            },
            {
                id: 'link2',
                title: 'Ещё источник',
            },
        ],
    },
    {
        id: 'ekbStreetArtSource',
        type: 'geojson',
        path: '/ekb-street-art.json',
        copyright: [],
        card: {
            title: 'name',
            cover: 'img',
            blocks: [
                { type: 'value', id: 'description' },
                { type: 'value', id: 'doc_name' },
            ],
        },
        properties: [
            {
                id: 'description',
                title: 'Описание',
            },
            {
                id: 'doc_name',
                title: 'Фестиваль',
                values: {
                    'Карт-бланш': { color: '#00b4ff' },
                    ЧÖ: { color: '#ffd400' },
                    Заходи: { color: '#5820e4' },
                    'Граффити-арт': { color: '#f758b6' },
                    PublicArtFestival: { color: '#00b400' },
                    Стенограффия: { color: '#86e621' },
                    'Zabroshka 2023–2024': { color: '#e63223' },
                    Разное: { color: '#ff640a' },
                },
            },
        ],
    },
];

export const defaultLayers: InputSloyLayer[] = [
    {
        id: 'ekb-house-age',
        title: 'Возраст домов',
        filters: [
            {
                type: 'range',
                filterVisualizations: ['ekbHouseAgeLayer'],
                source: 'osmBuilding',
                property: 'building:year',
            },
        ],
        visualizations: [
            {
                id: 'ekbHouseAgeLayer',
                type: 'building-range',
                source: 'osmBuilding',
                property: 'building:year',
                openable: true,
            },
        ],
    },
    {
        id: 'ekb-house-levels',
        title: 'Этажность домов',
        filters: [
            {
                type: 'range',
                filterVisualizations: ['ekbHouseLevelsLayer'],
                source: 'osmBuilding',
                property: 'building:levels',
            },
        ],
        visualizations: [
            {
                id: 'ekbHouseLevelsLayer',
                type: 'building-range',
                source: 'osmBuilding',
                property: 'building:levels',
                openable: true,
            },
        ],
    },
    {
        id: 'ekb-house-health',
        title: 'Степень износа домов',
        filters: [
            {
                type: 'range',
                filterVisualizations: ['ekbHouseHealthLayer'],
                source: 'osmBuilding',
                property: 'building:health',
            },
        ],
        visualizations: [
            {
                id: 'ekbHouseHealthLayer',
                type: 'building-range',
                source: 'osmBuilding',
                property: 'building:health',
                openable: true,
            },
        ],
    },
    {
        id: 'ekb-okn',
        title: 'Объекты культурного наследия',
        filters: [
            {
                title: 'Объекты ОКН',
                type: 'string',
                filterVisualizations: ['ekbOknObjectsLayer'],
                source: 'ekbOknSource',
                property: 'category',
                postfix: 'шт.',
                totalHeader: 'count',
                totalType: 'percent',
            },
            {
                title: 'Защитные зоны',
                color: '#e800b5',
                description:
                    'Временная зона в\u00A0100\u2013250 метров вокруг объекта, у\u00A0которого пока не\u00A0указана зона охраны',

                type: 'boolean',
                filterVisualizations: ['ekbOknProtectZoneLayer', 'ekbOknProtectZoneLayerStroke'],
                source: 'ekbOknProtectZoneSource',
            },
            {
                title: 'Зоны охраны ОКН',
                color: '#00b4ff',
                description:
                    'Территории, в\u00A0пределах которых запрещены любые работы, так как они могут причинить вред объекту',

                type: 'boolean',
                filterVisualizations: ['ekbOknSecurityZoneLayer', 'ekbOknSecurityZoneLayerStroke'],
                source: 'ekbOknSecurityZoneSource',
            },
            {
                title: 'Границы территорий ОКН',
                color: '#ff640f',
                description:
                    'Объект культурного наследия и\u00A0неотделимая от\u00A0него территория',
                type: 'boolean',
                filterVisualizations: ['ekbOknObjectZoneLayer', 'ekbOknObjectZoneLayerStroke'],
                source: 'ekbOknObjectZoneSource',
            },
        ],
        visualizations: [
            {
                type: 'marker-image',
                id: 'ekbOknObjectsLayer',
                source: 'ekbOknSource',
                property: 'category',
                previewPath: 'preview.s.src',
                openable: true,
            },
            {
                id: 'ekbOknProtectZoneLayer',
                source: 'ekbOknProtectZoneSource',
                type: 'map',
                mapLayerProps: {
                    type: 'fill',
                    paint: {
                        'fill-color': '#e800b5',
                        'fill-opacity': 0.2,
                    },
                },
            },
            {
                id: 'ekbOknSecurityZoneLayer',
                source: 'ekbOknSecurityZoneSource',
                type: 'map',
                mapLayerProps: {
                    type: 'fill',
                    paint: {
                        'fill-color': '#00b4ff',
                        'fill-opacity': 0.2,
                    },
                },
            },
            {
                id: 'ekbOknObjectZoneLayer',
                source: 'ekbOknObjectZoneSource',
                type: 'map',
                mapLayerProps: {
                    type: 'fill',
                    paint: {
                        'fill-color': '#ff640f',
                        'fill-opacity': 0.2,
                    },
                },
            },
            {
                id: 'ekbOknProtectZoneLayerStroke',
                source: 'ekbOknProtectZoneSource',
                type: 'map',
                mapLayerProps: {
                    type: 'line',
                    paint: {
                        'line-color': '#e800b5',
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            0.1,
                            MAX_ZOOM,
                            3,
                        ],
                        'line-dasharray': [2, 2],
                    },
                },
            },
            {
                id: 'ekbOknSecurityZoneLayerStroke',
                source: 'ekbOknSecurityZoneSource',
                type: 'map',
                mapLayerProps: {
                    type: 'line',
                    paint: {
                        'line-color': '#00b4ff',
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            0.1,
                            MAX_ZOOM,
                            3,
                        ],
                        'line-dasharray': [2, 2],
                    },
                },
            },
            {
                id: 'ekbOknObjectZoneLayerStroke',
                source: 'ekbOknObjectZoneSource',
                type: 'map',
                mapLayerProps: {
                    type: 'line',
                    paint: {
                        'line-color': '#ff640f',
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            0.1,
                            MAX_ZOOM,
                            3,
                        ],
                        'line-dasharray': [2, 2],
                    },
                },
            },
        ],
    },
    {
        id: 'ekb-design-code',
        title: '«Дизайн-код Екатеринбурга»',
        filters: [
            {
                title: 'Объекты',
                type: 'string',
                filterVisualizations: ['ekbDesignCodeLayer'],
                source: 'ekbDesigncodeSource',
                property: 'type',
                totalType: 'percent',
                postfix: 'шт.',
                totalHeader: 'count',
                sortType: 'count',
            },
        ],
        visualizations: [
            {
                id: 'ekbDesignCodeLayer',
                type: 'marker-image',
                source: 'ekbDesigncodeSource',
                property: 'type',
                rootSrc: 'https://map.ekaterinburg.design',
                previewPath: 'preview.s.src',
                openable: true,
            },
        ],
    },
    {
        id: 'ekb-house-dtp',
        title: 'ДТП',
        filters: [
            {
                type: 'range',
                filterVisualizations: ['ekbDtpPointsLayer', 'ekbDtpHeatmapLayer'],
                source: 'ekbDtpSource',
                property: 'year',
            },
            {
                title: 'Вред здоровью',
                type: 'string',
                filterVisualizations: ['ekbDtpPointsLayer', 'ekbDtpHeatmapLayer'],
                source: 'ekbDtpSource',
                property: 'severity',
                totalType: 'percent',
                postfix: 'шт.',
                sortType: 'count',
            },
            {
                title: 'Участник ДТП',
                type: 'string[]',
                filterVisualizations: ['ekbDtpPointsLayer', 'ekbDtpHeatmapLayer'],
                source: 'ekbDtpSource',
                property: 'participant_categories',
                totalType: 'percent',
                postfix: 'шт.',
                sortType: 'count',
            },
        ],
        visualizations: [
            {
                id: 'ekbDtpPointsLayer',
                source: 'ekbDtpSource',
                property: 'severity',
                openable: true,
                type: 'map',
                mapLayerProps: {
                    type: 'circle',
                    paint: {
                        'circle-stroke-width': 1,
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            1,
                            MAX_ZOOM,
                            12,
                        ],
                    },
                },
            },
            {
                id: 'ekbDtpHeatmapLayer',
                source: 'ekbDtpSource',
                property: 'severity',
                type: 'map',
                mapLayerProps: {
                    type: 'heatmap',
                    paint: {
                        'heatmap-weight': {
                            type: 'exponential',
                            property: 'weight',
                            stops: [
                                [0, 0],
                                [1, 1],
                            ],
                        },
                        'heatmap-intensity': 1,
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            'rgba(0, 0, 255, 0)',
                            0.2,
                            'rgb(0, 255, 0)',
                            0.4,
                            'rgb(255, 255, 0)',
                            0.6,
                            'rgb(255, 0, 0)',
                            1,
                            'rgb(255, 0, 0)',
                        ],
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            2,
                            MAX_ZOOM,
                            50,
                        ],
                        'heatmap-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            1,
                            MAX_ZOOM,
                            0,
                        ],
                    },
                },
            },
        ],
    },
    {
        id: 'ekb-lines',
        title: 'Туристические маршруты',
        filters: [
            {
                type: 'string',
                filterVisualizations: ['ekbPointsLayer', 'ekbLinesLayer'],
                source: 'ekbPointsSource',
                property: 'type',
            },
        ],
        visualizations: [
            {
                id: 'ekbLinesLayer',
                source: 'ekbLinesSource',
                property: 'type',
                type: 'map',
                mapLayerProps: {
                    type: 'line',
                    paint: {
                        'line-width': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            1,
                            MAX_ZOOM,
                            3,
                        ],
                    },
                },
            },
            {
                id: 'ekbPointsLayer',
                source: 'ekbPointsSource',
                property: 'type',
                openable: true,
                type: 'map',
                mapLayerProps: {
                    type: 'circle',
                    paint: {
                        'circle-stroke-width': 1,
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            1,
                            MAX_ZOOM,
                            12,
                        ],
                    },
                },
            },
        ],
    },
    {
        id: 'ekb-quarter',
        title: 'Квартальные',
        link: {
            label: 'Подробнее о квартальных',
            href: 'https://екатеринбург.рф/справка/квартальные/',
        },
        filters: [],
        visualizations: [
            {
                id: 'ekbQuarterLayer',
                source: 'ekbQuarterSource',
                openable: true,
                type: 'map',
                mapLayerProps: {
                    type: 'fill',
                    paint: {
                        'fill-color': '#9AADCC',
                        'fill-opacity': 0.6,
                    },
                },
            },
            {
                id: 'ekbQuarterLayerStroke',
                source: 'ekbQuarterSource',
                openable: true,
                type: 'map',
                mapLayerProps: {
                    type: 'line',
                    paint: {
                        'line-color': '#000',
                        'line-opacity': 0.5,
                        'line-width': 1.5,
                    },
                },
            },
        ],
    },
    {
        id: 'ekb-facades',
        title: 'Дизайн-код фасадов',
        link: {
            label: 'Стандарт дизайн-кода фасадов в туристском центре',
            href: 'https://guides.ekaterinburg.city/city-centre-design-code/general-provisions',
        },
        filters: [],
        visualizations: [
            {
                id: 'ekbFacadesLayer',
                type: 'building-ids',
                source: 'osmBuilding',
                ids: Object.keys(facades),
                openable: true,
                mapLayerProps: {
                    type: 'fill-extrusion',
                    paint: {
                        // @ts-ignore
                        'fill-extrusion-color': getLayerStateStyle<string>({
                            initial: 'rgba(129, 255, 0, 0.75)',
                            hover: 'rgba(129, 255, 0, 0.90)',
                            active: 'rgba(129, 255, 0, 1)',
                        }),
                    },
                },
            },
        ],
    },
    {
        id: 'ekb-crimes',
        title: 'Происшествия',
        description:
            'Слой содержит данные о правонарушениях, конфликтах и происшествиях, которые произошли в городе. Подготовлен в 2019 г. на основе сообщений в социальных сетях и новостных ресурсах. Автор датасета: Александр Бурцев, кандидат архитектуры.',
        filters: [
            {
                title: 'Тип происшествия',
                property: 'exident',
                type: 'string',
                filterVisualizations: ['ekbCrimePointsLayer', 'ekbCrimeHeatmapLayer'],
                source: 'ekbCrimeLayerSource',
                postfix: 'шт.',
                totalHeader: 'count',
                totalType: 'percent',
                sortType: 'count',
            },
        ],
        visualizations: [
            {
                id: 'ekbCrimePointsLayer',
                type: 'map',
                source: 'ekbCrimeLayerSource',
                openable: true,
                property: 'exident',
                mapLayerProps: {
                    type: 'circle',
                    paint: {
                        'circle-color': '#f18f00',
                        'circle-stroke-width': 1,
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            2,
                            MAX_ZOOM,
                            8,
                        ],
                    },
                },
            },
            {
                id: 'ekbCrimeHeatmapLayer',
                type: 'map',
                source: 'ekbCrimeLayerSource',
                property: 'exident',
                mapLayerProps: {
                    type: 'heatmap',
                    paint: {
                        'heatmap-weight': {
                            type: 'exponential',
                            property: 'weight',
                            stops: [
                                [0, 0],
                                [1, 1],
                            ],
                        },
                        'heatmap-intensity': 1,
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            'rgba(0, 0, 255, 0)',
                            0.2,
                            'rgb(0, 255, 0)',
                            0.4,
                            'rgb(255, 255, 0)',
                            0.6,
                            'rgb(255, 0, 0)',
                            1,
                            'rgb(255, 0, 0)',
                        ],
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            2,
                            MAX_ZOOM,
                            50,
                        ],
                        'heatmap-opacity': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            MIN_ZOOM,
                            1,
                            MAX_ZOOM,
                            0,
                        ],
                    },
                },
            },
        ],
    },
    {
        id: 'ekb-street-art',
        title: 'Карта уличного исскуства',
        description:
            '«Данная карта — это попытка систематизировать всё, что я знаю об уличном искусстве Екатеринбурга. Всего на карте более 700 отметок (к каждой прилагается фото) — это сохранившиеся работы, происхождение которых мне известно (кто автор, год создания, в рамках какого фестиваля или личная инициатива художника). Вы можете использовать эту карту, чтобы, например, спланировать маршрут прогулки по городу, но имейте в виду, что какие-то работы уже исчезли (о чём я не знал) или могут исчезнуть в любой момент». Дата последнего обновления данных: 27 Августа 2024',
        link: {
            label: 'Алексей Чудинов — StreetArtEkb',
            href: 'https://t.me/streetartekb',
        },
        filters: [
            {
                title: 'Объекты уличного исскуства',
                type: 'string',
                filterVisualizations: ['ekbStreetArtLayer'],
                source: 'ekbStreetArtSource',
                property: 'doc_name',
                postfix: 'шт.',
                totalHeader: 'count',
                totalType: 'percent',
                sortType: 'count',
            },
        ],
        visualizations: [
            {
                type: 'marker-image',
                id: 'ekbStreetArtLayer',
                source: 'ekbStreetArtSource',
                property: 'doc_name',
                previewPath: 'preview',
                openable: true,
            },
        ],
    },
];

export const copyrights: ICopyright[] = [
    {
        id: 'sloy',
        shortName: 'sloy.io',
        url: 'https://sloy.io/',
        requiredAttribution: true,
    },
    {
        id: 'osm',
        shortName: 'OpenStreetMap',
        fullName: 'OpenStreetMap',
        url: 'https://www.openstreetmap.org/',
        requiredAttribution: true,
    },
    {
        id: 'okn',
        shortName: 'Объекты культурного наследия Свердловской области',
        fullName: 'Объекты культурного наследия Свердловской области',
        url: 'https://okn.midural.ru/kategorii/obekty-kulturnogo-naslediya-sverdlovskoy-oblasti',
        requiredAttribution: false,
    },
    {
        id: 'howoldthishouse',
        shortName: 'Карта возраста домов',
        fullName: 'Карта возраста домов',
        url: 'https://how-old-is-this.house/',
        requiredAttribution: false,
    },
    {
        id: 'domaekb',
        shortName: 'Жилые дома Екатеринбурга',
        fullName: 'Жилые дома Екатеринбурга',
        url: 'https://domaekb.ru',
        requiredAttribution: false,
    },
    {
        id: 'mingkh',
        shortName: 'МинЖКХ',
        fullName: 'МинЖКХ',
        url: 'https://mingkh.ru',
        requiredAttribution: false,
    },
    {
        id: 'ekbDesignCode',
        shortName: 'Дизайн-код Ектеринбурга',
        fullName: 'Дизайн-код Ектеринбурга',
        url: 'https://ekaterinburg.design',
        requiredAttribution: false,
    },
    {
        id: 'dtp',
        shortName: 'Карта ДТП',
        fullName: 'Карта ДТП',
        url: 'https://dtp-stat.ru/',
        requiredAttribution: false,
    },
    {
        id: 'ekbQuarter',
        shortName: 'екатеринбург.рф',
        fullName: 'екатеринбург.рф',
        url: 'https://екатеринбург.рф/справка/квартальные',
        requiredAttribution: false,
    },
    {
        id: 'ekbDesignCodeMap',
        shortName: 'Карта объектов «Дизайн-кода»',
        fullName: 'Карта объектов «Дизайн-кода»',
        url: 'https://map.ekaterinburg.design',
        requiredAttribution: false,
    },
];
