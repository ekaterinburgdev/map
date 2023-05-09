import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { HistogramData, MinMax } from 'components/UI/RangeHistogram/types';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { HouseClient } from 'common/data/base/houseBase';

import { setData } from 'state/features/dataLayers';

import { RangeBaseFilter } from 'components/Model/RangeBaseFilter/RangeBaseFilter';

export interface HouseBaseFilterProps {
    defaultMin: number;
    defaultMax: number;
    onChangeRequest: (range: MinMax) => Promise<HouseClient[]>;
    getHistogramData: () => Promise<HistogramData>;
    filterType: FilterType;
}

export function HouseBaseFilter({
    onChangeRequest,
    defaultMin,
    defaultMax,
    getHistogramData,
    filterType,
}: HouseBaseFilterProps) {
    const dispatch = useDispatch();

    const getHouses = useCallback(
        async (range: MinMax) => {
            const houses = await onChangeRequest(range);

            dispatch(setData({ type: filterType, data: houses }));
        },
        [dispatch, onChangeRequest, filterType],
    );

    return (
        <RangeBaseFilter
            defaultMin={defaultMin}
            defaultMax={defaultMax}
            onChangeCallback={getHouses}
            getHistogramData={getHistogramData}
            filterType={filterType}
        />
    );
}
