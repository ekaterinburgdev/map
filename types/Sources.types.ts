export enum SourceType {
    osm = 'osm',
    okn = 'okn',
    howoldthishouse = 'howoldthishouse',
    domaekb = 'domaekb',
    mingkh = 'mingkh',
    ekaterinburgdesign = 'ekaterinburgdesign',
    dtp = 'dtp',
    ekb_quarter = 'ekb_quarter',
    design_objects_map = 'design_objects_map',
}

export type SourceInfo = {
    name: string;
    link: string;
    data: string;
};

export type SourcesConfig = Record<SourceType, SourceInfo>;
