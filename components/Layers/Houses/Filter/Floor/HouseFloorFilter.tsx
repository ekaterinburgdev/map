import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import { houseBase } from 'components/Layers/Houses/houseBase';
import { MinMax } from 'components/UI/RangeHistogram/types';
import { setFilterParams } from 'state/features/dataLayers';

import { FilterType } from 'types/Filters.types';
import { FLOOR_FILTERS_DATA, HouseSourceType } from '../../Houses.constants';
import { HouseBaseFilter } from '../Base/HouseBaseFilter';
import { MAX_FLOOR, MIN_FLOOR } from './HouseFloorFilter.constants';

export function HouseFloorFilter() {
    const dispatch = useDispatch();
    const router = useRouter();

    router.push({
        pathname: router.pathname,
        query: { ...router.query, filter: FilterType.HouseFloor },
    });

    const getHouses = useCallback(
        async (range: MinMax) => {
            dispatch(setFilterParams({ activeFilterParams: range }));
        },
        [dispatch],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase.getFilterValues(FLOOR_FILTERS_DATA, HouseSourceType.Floors).then((values) =>
                FLOOR_FILTERS_DATA.map((floorItemData, idx) => ({
                    ...floorItemData,
                    value: values[idx],
                })),
            ),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={MIN_FLOOR}
            defaultMax={MAX_FLOOR}
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
        />
    );
}
