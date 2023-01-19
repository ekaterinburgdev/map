import React, { useEffect, useState } from 'react';
import histogramStyles from './RangeHistogram.module.css';
import { Slider } from './components/Slider';
import { BarChart } from './components/BarChart';
import { Axis } from './components/Axis';
import { HistogramData, MinMax, Range } from './types';

interface Props {
    data: HistogramData;
    onChange: (range: MinMax) => void;
    width?: number;
    height?: number;
    defaultMin?: number;
    defaultMax?: number;
}

export function Histogram({
    data,
    width = 360,
    height = 100,
    onChange,
    defaultMin,
    defaultMax,
}: Props) {
    const min = Math.min(...data.map((d) => d.from));
    const max = Math.max(...data.map((d) => d.to));
    const [range, setRange] = useState<MinMax>({
        min: defaultMin || min,
        max: defaultMax || max,
    });

    const onSelect = ({ from, to }: Range) => setRange({ min: from, max: to });

    useEffect(() => {
        onChange?.(range);
    });

    return (
        <div className={histogramStyles.histogram} style={{ width }}>
            <BarChart data={data} range={range} height={height} onSelect={onSelect} />
            <div className={histogramStyles.histogram__range}>
                <Slider
                    width={width}
                    min={min}
                    max={max}
                    currentMin={range.min}
                    currentMax={range.max}
                    onChange={setRange}
                />
            </div>
            <div className={histogramStyles.histogram__axis}>
                <Axis data={data} range={range} onSelect={onSelect} />
            </div>
        </div>
    );
}
