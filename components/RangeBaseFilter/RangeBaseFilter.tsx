import React, { useEffect, useState } from 'react';

import { RangeHistogram } from 'shared/UI/RangeHistogram';
import { HistogramData, MinMax } from 'shared/UI/RangeHistogram/types';
import { FilterLoader } from 'shared/UI/Loader/FilterLoader/FilterLoader';

export interface RangeBaseFilterProps {
    defaultMin: number;
    defaultMax: number;
    units?: string;
    onChangeCallback: (range: MinMax) => Promise<void> | void;
    getHistogramData: () => Promise<HistogramData>;
    noLoader?: boolean;
}

export function RangeBaseFilter({
    defaultMin,
    defaultMax,
    units,
    onChangeCallback,
    getHistogramData,
    noLoader,
}: RangeBaseFilterProps) {
    const [rangeData, setRangeData] = useState<HistogramData>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getHistogramData().then((data: HistogramData) => {
            setRangeData(data);
            setLoading(false);
        });
    }, [getHistogramData]);

    if (loading) {
        if (noLoader) {
            return null;
        }

        return <FilterLoader />;
    }

    return (
        <RangeHistogram
            data={rangeData}
            onChange={onChangeCallback}
            width="auto"
            height={128}
            defaultMin={defaultMin}
            defaultMax={defaultMax}
            units={units}
        />
    );
}
