import React, { useCallback, useEffect, useState } from 'react';

import histogramStyles from './RangeHistogram.module.css';
import { Slider } from './components/Slider';
import { BarChart } from './components/BarChart';
import { Axis } from './components/Axis';
import { HistogramData, MinMax, Range } from './types';

interface Props {
    width?: number | 'auto';
    height?: number;

    defaultMin: number;
    defaultMax: number;

    data?: HistogramData;
    onChange: (minMax: MinMax) => void;
}

export function RangeHistogram({
    data,
    width = 'auto',
    height = 100,
    onChange,
    defaultMin,
    defaultMax,
}: Props) {
    const [barChartMinMax, setBarChartMinMax] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });

    const [sliderMinMax, setSliderMinMax] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });

    const [finalMinMax, setFinalMinMax] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });

    useEffect(() => {
        setFinalMinMax(barChartMinMax);
    }, [barChartMinMax]);

    useEffect(() => {
        setFinalMinMax(sliderMinMax);
    }, [sliderMinMax]);

    useEffect(() => {
        onChange(finalMinMax);
    }, [finalMinMax]);

    const onSelectInBarChart = (fromTo: Range) => {
        setBarChartMinMax({
            min: fromTo.from,
            max: fromTo.to,
        });
    };

    const onChangeSlider = useCallback((minMax: MinMax) => {
        setSliderMinMax(minMax);
    }, []);

    return data ? (
        <div className={histogramStyles.histogram} style={{ width }}>
            <BarChart
                data={data}
                sliderMinMax={sliderMinMax}
                height={height}
                onSelect={onSelectInBarChart}
                maxValue={defaultMax}
                minValue={defaultMin}
            />
            <div className={histogramStyles.histogram__range}>
                <Slider
                    data={data}
                    min={defaultMin}
                    max={defaultMax}
                    barChartMinMax={barChartMinMax}
                    onChange={onChangeSlider}
                />
            </div>
            <div className={histogramStyles.histogram__axis}>
                <Axis data={data} range={finalMinMax} />
            </div>
        </div>
    ) : null;
}
