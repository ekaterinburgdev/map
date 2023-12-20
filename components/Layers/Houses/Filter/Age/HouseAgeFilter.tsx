import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import { MinMax } from 'components/UI/RangeHistogram/types';

import { houseBase } from 'components/Layers/Houses/houseBase';
import { setFilterParams } from 'state/features/dataLayers';

import { AGE_FILTERS_DATA, HouseSourceType } from '../../Houses.constants';
import { HouseBaseFilter } from '../Base/HouseBaseFilter';
import { CURRENT_YEAR, EKATERINBURG_FOUNDATION_YEAR } from './HouseAgeFilter.constants';

export function HouseAgeFilter() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { filter, ...rest } = router.query;

    useEffect(() => {
        router.push({
            pathname: router.pathname,
            query: { ...rest },
        });
    }, []);

    const getHouses = useCallback(
        async (range: MinMax) => {
            dispatch(setFilterParams({ activeFilterParams: range }));
        },
        [dispatch],
    );

    const getHistogramData = useCallback(
        async () =>
            houseBase.getFilterValues(AGE_FILTERS_DATA, HouseSourceType.Year).then((values) =>
                AGE_FILTERS_DATA.map((ageItemData, idx) => ({
                    ...ageItemData,
                    value: values[idx],
                })),
            ),
        [],
    );

    return (
        <HouseBaseFilter
            defaultMin={EKATERINBURG_FOUNDATION_YEAR}
            defaultMax={CURRENT_YEAR}
            onChangeRequest={getHouses}
            getHistogramData={getHistogramData}
        />
    );
}
