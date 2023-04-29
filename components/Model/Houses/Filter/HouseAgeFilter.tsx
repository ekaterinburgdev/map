import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RangeHistogram } from 'components/UI/RangeHistogram';
import { HistogramData, MinMax } from 'components/UI/RangeHistogram/types';

import { houseBase } from 'common/data/base/houseBase';
import { houseAge } from 'common/data/houseAge/houseAge';
import { MapItemType } from 'common/types/map-item';
import { State } from 'common/types/state';
import { setData } from 'state/features/dataLayers';

import { AGE_FILTERS_DATA } from '../Houses.constants';

export const REQUEST_DELAY = 1000;
let timeoutId = null;
const EKATERINBURG_FOUND = 1723;
const CURRENT_YEAR = new Date().getFullYear();

export function HouseAgeFilter() {
    const dispatch = useDispatch();
    const shouldFetch = useSelector((state: State) => state.dataLayer.houses.isOpen);
    const [rangeData, setRangeData] = useState<HistogramData>(null);

    useEffect(() => {
        houseBase.getFilterValues(AGE_FILTERS_DATA, 'Year').then((values) => {
            const data = AGE_FILTERS_DATA.map((d, idx) => ({
                ...d,
                value: values[idx],
            }));

            setRangeData(data);
        });
    }, []);

    const onChange = useCallback(
        async (range: MinMax) => {
            if (!shouldFetch) {
                return;
            }

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const currentTimeoutId = setTimeout(async () => {
                const houses = await houseAge.getObjectsPolygonsByRange(range.min, range.max);

                dispatch(setData({ type: MapItemType.Houses, data: houses }));
                timeoutId = null;
            }, REQUEST_DELAY);

            timeoutId = currentTimeoutId;
        },
        [dispatch, shouldFetch],
    );

    return (
        <RangeHistogram
            data={rangeData}
            onChange={onChange}
            width={368}
            height={128}
            defaultMin={EKATERINBURG_FOUND}
            defaultMax={CURRENT_YEAR}
        />
    );
}
