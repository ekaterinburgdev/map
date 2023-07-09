import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RangeHistogram } from 'components/UI/RangeHistogram';
import { HistogramData, MinMax } from 'components/UI/RangeHistogram/types';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';

import { State } from 'common/types/state';

import { REQUEST_DELAY, timeoutIds } from './RangeBaseFilter.constants';

export interface RangeBaseFilterProps {
    defaultMin: number;
    defaultMax: number;
    onChangeCallback: (range: MinMax) => Promise<void> | void;
    getHistogramData: () => Promise<HistogramData>;
    filterType: FilterType;
    noLoader?: boolean;
}

export function RangeBaseFilter({
    defaultMin,
    defaultMax,
    onChangeCallback,
    getHistogramData,
    filterType,
    noLoader,
}: RangeBaseFilterProps) {
    const shouldFetch = useSelector((state: State) => state.dataLayer.activeFilter === filterType);
    const [rangeData, setRangeData] = useState<HistogramData>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
                await onChangeCallback(range);

                timeoutIds[filterType] = null;
            }, REQUEST_DELAY);

            timeoutIds[filterType] = currentTimeoutId;
        },
        [filterType, shouldFetch, onChangeCallback],
    );

    return !loading ? (
        <RangeHistogram
            data={rangeData}
            onChange={onChange}
            width="auto"
            height={128}
            defaultMin={defaultMin}
            defaultMax={defaultMax}
        />
    ) : (
        <>{!noLoader && <FilterLoader />}</>
    );
}
