import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';

import { HistogramData } from '../types';

import { getValueFromPercent } from './Slider.helpers';

import sliderStyles from './Slider.module.css';

interface Props {
    data: HistogramData;
    min: number;
    max: number;
    onChange: Function;
    currentMin?: number;
    currentMax?: number;
}

const ERROR = 0.15;

export function Slider({
    min,
    max,
    currentMin = min,
    currentMax = max,
    onChange,
    data,
}: Props) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValueRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValueRef.current) {
            const minPercent = minValue;
            const maxPercent = +maxValueRef.current.value;

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minValue]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = +minValRef.current.value;
            const maxPercent = maxValue;

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxValue]);

    // Get min and max values when their state changes
    useEffect(() => {
        const minDataValue = getValueFromPercent(data, minValue);
        const maxDataValue = getValueFromPercent(data, maxValue);

        onChange({ min: minDataValue, max: maxDataValue });
    }, [minValue, maxValue, onChange, data]);

    useEffect(() => {
        const minIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(currentMin - from) <= epsilon;
        });
        const minPercent = !minIndex ? 0 : Math.floor((minIndex / data.length) * 100);

        setMinValue(minPercent);
    }, [currentMin, data]);

    useEffect(() => {
        const maxIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(currentMax - to) <= epsilon;
        });
        const maxPercent = Math.ceil(((maxIndex + 1) / data.length) * 100);

        setMaxValue(maxPercent);
    }, [currentMax, data]);

    return (
        <div>
            <input
                type="range"
                min={0}
                max={100}
                value={minValue}
                ref={minValRef}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_left, {
                    [sliderStyles.thumb_zindex_5]: minValue > max - 100,
                })}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(+event.target.value, maxValue - 1);
                    setMinValue(value);
                }}
            />
            <input
                type="range"
                min={0}
                max={100}
                value={maxValue}
                ref={maxValueRef}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_right)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(+event.target.value, minValue + 1);
                    setMaxValue(value);
                }}
            />

            <div className={sliderStyles.slider}>
                <div className={sliderStyles.slider__track} />
                <div ref={range} className={sliderStyles.slider__range} />
            </div>
        </div>
    );
}
