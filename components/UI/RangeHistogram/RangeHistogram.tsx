import React, { useCallback, useEffect, useState } from 'react';

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
    type?: string;
}

export function RangeHistogram({
    data,
    width = 360,
    height = 100,
    onChange,
    defaultMin,
    defaultMax,
    type,
}: Props) {
    const [barChartRange, setBarChartRange] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });

    const [sliderRange2, setSliderRange2] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });

    const [finalRange, setFinalRange] = useState<MinMax>({
        min: defaultMin,
        max: defaultMax,
    });

    useEffect(() => {
        setFinalRange(barChartRange);
        console.log("barChartRange ", barChartRange);
    }, [barChartRange]);

    useEffect(() => {
        setFinalRange(sliderRange2);
        console.log('slider range ', sliderRange2);
    }, [sliderRange2]);

    useEffect(() => {
        onChange(finalRange);
    }, [finalRange]);

    // const [range, setRange] = useState<MinMax>({
    //     min: defaultMin,
    //     max: defaultMax,
    // });
    // const [sliderRange, setSliderRange] = useState<MinMax>({
    //     min: defaultMin,
    //     max: defaultMax,
    // });

    const onSelectInBarChart = (fromTo: Range) => {
        setBarChartRange({
            min: fromTo.from,
            max: fromTo.to,
        });
    };

    const onChangeSlider = useCallback((minMax: MinMax) => {
        setSliderRange2(minMax);
    }, []);

    // useEffect(() => {
    //     console.log('type ', type);
    //     console.log({ range });
    //     console.log('-----');
    // }, [range]);

    // const onSelect = ({ from, to }: Range) => {
    //     setSliderRange({ min: from, max: to });
    //     setRange({ min: from, max: to });
    // };

    // useEffect(() => {
    //     onChange?.(range);
    // }, [range, onChange]);

    // const onChange2 = useCallback((minmax: MinMax) => {
    //     console.log('on change 2', minmax);
    //     setRange(minmax);
    // }, []);

    return data ? (
        <div className={histogramStyles.histogram} style={{ width }}>
            <BarChart
                data={data}
                sliderRange={sliderRange2}
                height={height}
                onSelect={onSelectInBarChart}
                max={defaultMax}
                min={defaultMin}
                // onSelect={onSelect}
            />
            <div className={histogramStyles.histogram__range}>
                <Slider
                    data={data}
                    width={width}
                    min={defaultMin}
                    max={defaultMax}
                    barChartMin={barChartRange.min}
                    barChartMax={barChartRange.max}
                    onChange={onChangeSlider}
                    // onChange={(minmax: MinMax) => {
                    //     setRange(minmax);
                    // }}
                    // onChange={onChange2}
                />
            </div>
            <div className={histogramStyles.histogram__axis}>
                <Axis
                    data={data}
                    range={finalRange}
                />
            </div>
        </div>
    ) : null;
}
