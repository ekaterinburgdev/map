import { OknAreaType } from 'common/data/okn/oknConstants';
import { MapItemType } from 'common/types/map-item';
import { State } from 'common/types/state';
import { FilterType } from 'components/UI/Filters/Filters.types';

const filterTypeMapItemTypeMap: Record<FilterType, MapItemType> = {
    [FilterType.HouseAge]: MapItemType.Houses,
    [FilterType.HouseFloor]: MapItemType.Houses,
    [FilterType.HouseWearTear]: MapItemType.Houses,
    [FilterType.DTP]: MapItemType.DTP,
    [FilterType.DesignCode]: MapItemType.DesignCode,
    [FilterType.Line]: MapItemType.Lines,
    [FilterType.OKN]: MapItemType.OKN,
};

export const initialObjectsState = Object.values(FilterType).reduce(
    (acc, type) => {
        const mapItemType = filterTypeMapItemTypeMap[type];

        if (type === FilterType.Line) {
            acc[type] = { data: { lines: [], points: [] }, mapItemType };
        } else {
            acc[type] = { data: [], mapItemType };
        }

        return acc;
    },
    {
        [OknAreaType.ObjectZone]: { data: [], mapItemType: MapItemType.OKN },
        [OknAreaType.SecurityZone]: { data: [], mapItemType: MapItemType.OKN },
        [OknAreaType.ProtectZone]: { data: [], mapItemType: MapItemType.OKN },
    },
) as State['dataLayer']['objects'];

export const initialState: State['dataLayer'] = {
    objects: initialObjectsState,
    activeFilter: Object.values(FilterType)[0],
};
