import React, { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react';
import classnames from 'classnames';

import { HistogramData, MinMax } from '../types';

import { getValueFromPercent } from './Slider.helpers';

import sliderStyles from './Slider.module.css';

interface Props {
    data: HistogramData;

    // minimal value of slider (in absolute units)
    min: number;
    // maximal value of slider (in absolute units)
    max: number;

    // on manual movement of slider
    onChange: (minMax: MinMax) => void;
    barChartMinMax: MinMax;
}

const ERROR = 0.15;

export function Slider({ max, barChartMinMax, onChange, data }: Props) {
    const [startValueInternal, setStartValueInternal] = useState(0);
    const [endValueInternal, setEndValueInternal] = useState(100);

    const [startValue, setStartValue] = useState(0);
    const [endValue, setEndValue] = useState(100);

    const leftSliderRef = useRef<HTMLInputElement>(null);
    const rightSliderRef = useRef<HTMLInputElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    // when left slider is moved - update startValue
    useEffect(() => {
        setStartValue(startValueInternal);
    }, [startValueInternal]);

    // when right slider is moved - update endValue
    useEffect(() => {
        setEndValue(endValueInternal);
    }, [endValueInternal]);

    // when slider is moved - lift up new state to parent components
    useEffect(() => {
        const minDataValue = getValueFromPercent(data, startValueInternal);
        const maxDataValue = getValueFromPercent(data, endValueInternal);
        onChange({ min: minDataValue, max: maxDataValue });
    }, [startValueInternal, endValueInternal, onChange, data]);

    // when barChartLeft updated - update startValue
    useEffect(() => {
        const minIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(barChartMinMax.min - from) <= epsilon;
        });
        const minPercent = !minIndex ? 0 : (minIndex / data.length) * 100;

        setStartValue(minPercent);
    }, [barChartMinMax, data]);

    // when barChartRight updated - update endValue
    useEffect(() => {
        const maxIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(barChartMinMax.max - to) <= epsilon;
        });
        const maxPercent = ((maxIndex + 1) / data.length) * 100;

        setEndValue(maxPercent);
    }, [barChartMinMax, data]);

    // when startValue is updated - change the position of left slider
    useEffect(() => {
        if (rightSliderRef.current) {
            const minPercent = startValue;
            const maxPercent = Number(rightSliderRef.current.value);

            if (rangeRef.current) {
                rangeRef.current.style.left = `${minPercent}%`;
                rangeRef.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [startValue]);

    // when endValue is updated - change the position of right slider
    useEffect(() => {
        if (leftSliderRef.current) {
            const minPercent = Number(leftSliderRef.current.value);

            if (rangeRef.current) {
                rangeRef.current.style.width = `${endValue - minPercent}%`;
            }
        }
    }, [endValue]);

    // when starting movement of slider should update inner state with actual values
    const setActualValuesToInnerState = useCallback(() => {
        setStartValueInternal(startValue);
        setEndValueInternal(endValue);
    }, [startValue, endValue]);

    return (
        <div>
            <input
                type="range"
                min={0}
                max={100}
                value={Math.floor(startValue)}
                ref={leftSliderRef}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_left, {
                    [sliderStyles.thumb_zindex_5]: startValue > max - 100,
                })}
                onMouseDown={setActualValuesToInnerState}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newLeftSliderPositionInPercents = Math.min(
                        Number(event.target.value),
                        endValue - 1,
                    );
                    setStartValueInternal(newLeftSliderPositionInPercents);
                }}
            />
            <input
                type="range"
                min={0}
                max={100}
                value={Math.ceil(endValue)}
                ref={rightSliderRef}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_right)}
                onMouseDown={setActualValuesToInnerState}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newRightSliderPositionInPercents = Math.max(
                        Number(event.target.value),
                        startValue + 1,
                    );
                    setEndValueInternal(newRightSliderPositionInPercents);
                }}
            />

            <div className={sliderStyles.slider}>
                <div className={sliderStyles.slider__track} />
                <div ref={rangeRef} className={sliderStyles.slider__range} />
            </div>
        </div>
    );
}
