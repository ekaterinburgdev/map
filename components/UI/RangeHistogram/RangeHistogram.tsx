import React, { useCallback, useState } from 'react';

import histogramStyles from './RangeHistogram.module.css';
import { Slider } from './components/Slider';
import { BarChart } from './components/BarChart';
import { Axis } from './components/Axis';
import { HistogramData, MinMax, Range } from './types';

interface Props {
    data?: HistogramData;
    onChange: (range: MinMax) => void;
    width?: number;
    height?: number;
    defaultMin: number;
    defaultMax: number;
}

export function RangeHistogram({
    data,
    width = 360,
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

    const onChangeRange: Props['onChange'] = useCallback(
        (p) => {
            setRange(p);
            onChange(p);
        },
        [onChange],
    );

    return data ? (
        <div className={histogramStyles.histogram} style={{ width }}>
            <BarChart data={data} range={range} height={height} onSelect={onSelect} />
            <div className={histogramStyles.histogram__range}>
                <Slider
                    data={data}
                    width={width}
                    min={defaultMin}
                    max={defaultMax}
                    currentMin={sliderRange.min}
                    currentMax={sliderRange.max}
                    onChange={onChangeRange}
                />
            </div>
            <div className={histogramStyles.histogram__axis}>
                <Axis data={data} range={range} onSelect={onSelect} />
            </div>
        </div>
    ) : null;
}
