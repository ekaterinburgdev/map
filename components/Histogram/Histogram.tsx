import React, { useEffect, useState } from 'react';
import histogramStyles from './Histogram.module.css';
import { Slider } from './components/Slider';
import { BarChart } from './components/BarChart';
import { Axis } from './components/Axis';
import { HistogramData, Range } from './types';

interface Props {
    data: HistogramData;
    onChange: (range: Range) => void;
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
    const [range, setRange] = useState<Range>({ min, max });

    useEffect(() => {
        onChange?.(range);
    });

    return (
        <div className={histogramStyles.histogram} style={{ width }}>
            <BarChart data={data} range={range} height={height} />
            <div className={histogramStyles.histogram__range}>
                <Slider
                    width={width}
                    min={min}
                    max={max}
                    currentMin={defaultMin || min}
                    currentMax={defaultMax || max}
                    onChange={setRange}
                />
            </div>
            <div className={histogramStyles.histogram__axis}>
                <Axis data={data} range={range} />
            </div>
        </div>
    );
}
