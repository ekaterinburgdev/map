import React from 'react';
import { HistogramData, MinMax } from 'shared/UI/RangeHistogram/types';
import { RangeBaseFilter } from 'shared/UI/RangeBaseFilter/RangeBaseFilter';

export interface HouseBaseFilterProps {
    defaultMin: number;
    defaultMax: number;
    units?: string;
    onChangeRequest: (range: MinMax) => void;
    getHistogramData: () => Promise<HistogramData>;
}

export function HouseBaseFilter({
    onChangeRequest,
    defaultMin,
    defaultMax,
    units,
    getHistogramData,
}: HouseBaseFilterProps) {
    return (
        <RangeBaseFilter
            defaultMin={defaultMin}
            defaultMax={defaultMax}
            units={units}
            onChangeCallback={onChangeRequest}
            getHistogramData={getHistogramData}
        />
    );
}
