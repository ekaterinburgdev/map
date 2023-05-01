import { MapItemType } from 'common/types/map-item';
import { State } from 'common/types/state';
import { FilterType } from 'components/UI/Filters/Filters.types';

const filterTypeMapItemTypeMap: Record<FilterType, MapItemType> = {
    [FilterType.HouseAge]: MapItemType.Houses,
    [FilterType.HouseFloor]: MapItemType.Houses,
    [FilterType.DTP]: MapItemType.DTP,
    [FilterType.DesignCode]: MapItemType.DesignCode,
    [FilterType.Line]: MapItemType.Lines,
    [FilterType.OKN]: MapItemType.OKN,
};

export const initialObjectsState = Object.values(FilterType).reduce((acc, type) => {
    const mapItemType = filterTypeMapItemTypeMap[type];

    acc[type] = { data: [], mapItemType };

    return acc;
}, {}) as State['dataLayer']['objects'];

export const initialState: State['dataLayer'] = {
    objects: initialObjectsState,
    activeFilter: Object.values(FilterType)[0],
};
