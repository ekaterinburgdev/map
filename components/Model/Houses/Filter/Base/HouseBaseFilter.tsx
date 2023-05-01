import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Loader } from 'components/UI/Loader/Loader';
import { RangeHistogram } from 'components/UI/RangeHistogram';
import { HistogramData, MinMax } from 'components/UI/RangeHistogram/types';
import { FilterType } from 'components/UI/Filters/Filters.types';

import { State } from 'common/types/state';
import { HouseClient } from 'common/data/base/houseBase';

import { setData } from 'state/features/dataLayers';

import styles from './HouseBaseFilter.module.css';

const REQUEST_DELAY = 1000;
const timeoutIds: Partial<Record<FilterType, NodeJS.Timeout>> = {};

export interface HouseBaseFilterProps {
    defaultMin: number;
    defaultMax: number;
    onChangeRequest: (range: MinMax) => Promise<HouseClient[]>;
    getHistogramData: () => Promise<HistogramData>;
    filterType: FilterType;
}

export function HouseBaseFilter({
    defaultMin,
    defaultMax,
    onChangeRequest,
    getHistogramData,
    filterType,
}: HouseBaseFilterProps) {
    const shouldFetch = useSelector((state: State) => state.dataLayer.activeFilter === filterType);
    const [rangeData, setRangeData] = useState<HistogramData>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    const getHouses = useCallback(
        async (range: MinMax) => {
            const houses = await onChangeRequest(range);

            dispatch(setData({ type: filterType, data: houses }));
        },
        [dispatch, onChangeRequest, filterType],
    );

    useEffect(() => {
        getHistogramData().then((data: HistogramData) => {
            setRangeData(data);
            setLoading(false);
        });
    }, [getHistogramData]);

    const onChange = useCallback(
        async (range: MinMax) => {
            if (!shouldFetch) {
                return;
            }

            if (timeoutIds[filterType]) {
                clearTimeout(timeoutIds[filterType]);
            }

            const currentTimeoutId = setTimeout(async () => {
                await getHouses(range);

                timeoutIds[filterType] = null;
            }, REQUEST_DELAY);

            timeoutIds[filterType] = currentTimeoutId;
        },
        [filterType, shouldFetch, getHouses],
    );

    return !loading ? (
        <RangeHistogram
            data={rangeData}
            onChange={onChange}
            width={368}
            height={128}
            defaultMin={defaultMin}
            defaultMax={defaultMax}
        />
    ) : (
        <div className={classNames(styles.HouseBaseFilterLoader)}>
            <Loader />
        </div>
    );
}
