import React from 'react';

import { HistogramData, MinMax } from 'components/UI/RangeHistogram/types';

import { RangeBaseFilter } from 'components/Model/RangeBaseFilter/RangeBaseFilter';

export interface HouseBaseFilterProps {
    defaultMin: number;
    defaultMax: number;
    onChangeRequest: (range: MinMax) => void;
    getHistogramData: () => Promise<HistogramData>;
}

export function HouseBaseFilter({
    onChangeRequest,
    defaultMin,
    defaultMax,
    getHistogramData,
}: HouseBaseFilterProps) {
    return (
        <RangeBaseFilter
            defaultMin={defaultMin}
            defaultMax={defaultMax}
            onChangeCallback={onChangeRequest}
            getHistogramData={getHistogramData}
        />
    );
}
