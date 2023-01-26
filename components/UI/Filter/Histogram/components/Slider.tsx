import React, { ChangeEvent, useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { getPercent as getPercentUtil } from '../utils';
import sliderStyles from './Slider.module.css';

interface Props {
    width: number;
    min: number;
    max: number;
    onChange: Function;
    currentMin?: number;
    currentMax?: number;
}

export function Slider({ width, min, max, currentMin = min, currentMax = max, onChange }: Props) {
    const [minValue, setMinValue] = useState(currentMin);
    const [maxValue, setMaxValue] = useState(currentMax);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValueRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback((value: number) => getPercentUtil(min, max, value), [min, max]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValueRef.current) {
            const minPercent = getPercent(minValue);
            const maxPercent = getPercent(+maxValueRef.current.value);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minValue, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxValue);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxValue, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minValue, max: maxValue });
    }, [minValue, maxValue, onChange]);

    useEffect(() => {
        setMinValue(currentMin);
    }, [currentMin]);

    useEffect(() => {
        setMaxValue(currentMax);
    }, [currentMax]);

    const thumbStyles = { width: width + 10, marginRight: -5, marginLeft: -5 };

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={minValue}
                ref={minValRef}
                style={thumbStyles}
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
                min={min}
                max={max}
                value={maxValue}
                ref={maxValueRef}
                style={thumbStyles}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_right)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(+event.target.value, minValue + 1);
                    setMaxValue(value);
                }}
            />

            <div className={sliderStyles.slider} style={{ width }}>
                <div className={sliderStyles.slider__track} />
                <div ref={range} className={sliderStyles.slider__range} />
            </div>
        </div>
    );
}