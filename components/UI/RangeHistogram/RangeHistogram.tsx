import React, { useEffect, useState } from 'react';

import histogramStyles from './RangeHistogram.module.css';
import { Slider } from './components/Slider';
import { BarChart } from './components/BarChart';
import { Axis } from './components/Axis';
import { HistogramData, MinMax, Range } from './types';

interface Props {
    data?: HistogramData;
    onChange: (range: MinMax) => void;
    width?: number | 'auto',
    height?: number;
    defaultMin: number;
    defaultMax: number;
}

export function RangeHistogram({
    data,
    width = 'auto',
    height = 100,
    onChange,
    defaultMin,
    defaultMax,
}: Props) {
    const [range, setRange] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });
    const [sliderRange, setSliderRange] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });

    const onSelect = ({ from, to }: Range) => {
        setSliderRange({ min: from, max: to });
        setRange({ min: from, max: to });
    };

    useEffect(() => {
        onChange?.(range);
    }, [range, onChange]);

    return data ? (
        <div className={histogramStyles.histogram} style={{ width }}>
            <BarChart
                data={data}
                range={range}
                height={height}
                onSelect={onSelect}
            />
            <div className={histogramStyles.histogram__range}>
                <Slider
                    data={data}
                    min={defaultMin}
                    max={defaultMax}
                    currentMin={sliderRange.min}
                    currentMax={sliderRange.max}
                    onChange={setRange}
                />
            </div>
            <div className={histogramStyles.histogram__axis}>
                <Axis data={data} range={range} onSelect={onSelect} />
            </div>
        </div>
    ) : null;
}
