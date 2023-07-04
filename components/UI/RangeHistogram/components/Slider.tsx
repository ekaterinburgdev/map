import React, { ChangeEvent, useEffect, useState, useRef, useMemo } from 'react';
import classnames from 'classnames';

import { HistogramData } from '../types';

import { getValueFromPercent } from './Slider.helpers';

import sliderStyles from './Slider.module.css';

interface Props {
    data: HistogramData;
    width: number;
    min: number;
    max: number;
    onChange: Function;
    barChartMin?: number;
    barChartMax?: number;
}

const ERROR = 0.15;

export function Slider({
    width,
    // минимально возможное значение на слайдере (в условных единицах)
    min,
    // максимально возможное значение на слайдере (в условных единицах)
    max,
    barChartMin = min,
    barChartMax = max,
    // вызываем только когда поменялось внутреннее состояние
    onChange,
    data,
}: Props) {
    const [innerSelectedLeft, setInnerSelectedLeft] = useState(0);
    const [innerSelectedRight, setInnerSelectedRight] = useState(100);

    const [leftSliderPositionInPercents, setLeftSliderPositionInPercents] = useState(0);
    const [rightSliderPositionInPercents, setRightSliderPositionInPercents] = useState(100);
    const leftSliderRef = useRef<HTMLInputElement>(null);
    const rightSliderRef = useRef<HTMLInputElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLeftSliderPositionInPercents(innerSelectedLeft);
    }, [innerSelectedLeft]);

    useEffect(() => {
        setRightSliderPositionInPercents(innerSelectedRight);
    }, [innerSelectedRight]);

    // Get min and max values when their state changes
    useEffect(() => {
        const minDataValue = getValueFromPercent(data, innerSelectedLeft);
        const maxDataValue = getValueFromPercent(data, innerSelectedRight);

        console.log('use effect in slider with change');

        // здесь передаются неправильные min, max
        onChange({ min: minDataValue, max: maxDataValue });
    }, [innerSelectedLeft, innerSelectedRight, onChange, data]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (rightSliderRef.current) {
            const minPercent = leftSliderPositionInPercents;
            const maxPercent = +rightSliderRef.current.value;

            if (rangeRef.current) {
                rangeRef.current.style.left = `${minPercent}%`;
                rangeRef.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [leftSliderPositionInPercents]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (leftSliderRef.current) {
            const minPercent = +leftSliderRef.current.value;
            const maxPercent = rightSliderPositionInPercents;

            if (rangeRef.current) {
                rangeRef.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [rightSliderPositionInPercents]);

    useEffect(() => {
        console.log('on change in slider changed');
    }, [onChange]);

    useEffect(() => {
        const minIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(barChartMin - from) <= epsilon;
        });
        const minPercent = !minIndex ? 0 : Math.floor((minIndex / data.length) * 100);

        setLeftSliderPositionInPercents(minPercent);
    }, [barChartMin, data]);

    useEffect(() => {
        const maxIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(barChartMax - to) <= epsilon;
        });
        const maxPercent = Math.ceil(((maxIndex + 1) / data.length) * 100);

        setRightSliderPositionInPercents(maxPercent);
    }, [barChartMax, data]);

    const thumbStyles = useMemo(
        () => ({
            width: width + 10,
            marginRight: -5,
            marginLeft: -5,
        }),
        [width],
    );

    return (
        <div>
            <input
                type="range"
                min={0}
                max={100}
                value={leftSliderPositionInPercents}
                ref={leftSliderRef}
                style={thumbStyles}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_left, {
                    [sliderStyles.thumb_zindex_5]: leftSliderPositionInPercents > max - 100,
                })}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newLeftSliderPositionInPercents = Math.min(
                        +event.target.value,
                        rightSliderPositionInPercents - 1,
                    );
                    setInnerSelectedLeft(newLeftSliderPositionInPercents);
                }}
            />
            <input
                type="range"
                min={0}
                max={100}
                value={rightSliderPositionInPercents}
                ref={rightSliderRef}
                style={thumbStyles}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_right)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newRightSliderPositionInPercents = Math.max(
                        +event.target.value,
                        leftSliderPositionInPercents + 1,
                    );
                    setInnerSelectedRight(newRightSliderPositionInPercents);
                }}
            />

            <div className={sliderStyles.slider} style={{ width }}>
                <div className={sliderStyles.slider__track} />
                <div ref={rangeRef} className={sliderStyles.slider__range} />
            </div>
        </div>
    );
}
