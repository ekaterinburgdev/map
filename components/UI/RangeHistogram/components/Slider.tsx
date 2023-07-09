import React, { ChangeEvent, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import classnames from 'classnames';

import { HistogramData, MinMax } from '../types';

import { getValueFromPercent } from './Slider.helpers';

import sliderStyles from './Slider.module.css';

interface Props {
    data: HistogramData;
    width: number;

    // minimal value of slider (in absolute units)
    min: number;
    // maximal value of slider (in absolute units)
    max: number;

    // on manual movement of slider
    onChange: Function;
    barChartMinMax: MinMax;
}

const ERROR = 0.15;

export function Slider({ width, min, max, barChartMinMax, onChange, data }: Props) {
    const [innerSelectedLeft, setInnerSelectedLeft] = useState(0);
    const [innerSelectedRight, setInnerSelectedRight] = useState(100);

    const [actualLeft, setActualLeft] = useState(0);
    const [actualRight, setActualRight] = useState(100);

    const leftSliderRef = useRef<HTMLInputElement>(null);
    const rightSliderRef = useRef<HTMLInputElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    // when left slider is moved - update actualLeft
    useEffect(() => {
        console.log({ innerSelectedLeft });
        setActualLeft(innerSelectedLeft);
    }, [innerSelectedLeft]);

    // when right slider is moved - update actualRight
    useEffect(() => {
        console.log({ innerSelectedRight });
        setActualRight(innerSelectedRight);
    }, [innerSelectedRight]);

    // when slider is moved - lift up new state to parent components
    useEffect(() => {
        const minDataValue = getValueFromPercent(data, innerSelectedLeft);
        const maxDataValue = getValueFromPercent(data, innerSelectedRight);
        console.log('on change in slider');
        console.log({ innerSelectedLeft, innerSelectedRight, minDataValue, maxDataValue });
        onChange({ min: minDataValue, max: maxDataValue });
    }, [innerSelectedLeft, innerSelectedRight, onChange, data]);

    // when barChartLeft updated - update actualLeft
    useEffect(() => {
        const minIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(barChartMinMax.min - from) <= epsilon;
        });
        const minPercent = !minIndex ? 0 : (minIndex / data.length) * 100;

        setActualLeft(minPercent);
    }, [barChartMinMax, data]);

    // when barChartRight updated - update actualRight
    useEffect(() => {
        const maxIndex = data.findIndex(({ from, to }) => {
            const epsilon = ERROR * (to - from);

            return Math.abs(barChartMinMax.max - to) <= epsilon;
        });
        const maxPercent = ((maxIndex + 1) / data.length) * 100;

        setActualRight(maxPercent);
    }, [barChartMinMax, data]);

    // when actualLeft is updated - change the position of left slider
    useEffect(() => {
        if (rightSliderRef.current) {
            const minPercent = actualLeft;
            const maxPercent = +rightSliderRef.current.value;

            if (rangeRef.current) {
                rangeRef.current.style.left = `${minPercent}%`;
                rangeRef.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [actualLeft]);

    // when actualRight is updated - change the position of right slider
    useEffect(() => {
        if (leftSliderRef.current) {
            const minPercent = +leftSliderRef.current.value;

            if (rangeRef.current) {
                rangeRef.current.style.width = `${actualRight - minPercent}%`;
            }
        }
    }, [actualRight]);

    // when starting movement of slider should update inner state with actual values
    const setActualValuesToInnerState = useCallback(() => {
        setInnerSelectedLeft(actualLeft);
        setInnerSelectedRight(actualRight);
    }, [actualLeft, actualRight]);

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
                value={Math.floor(actualLeft)}
                ref={leftSliderRef}
                style={thumbStyles}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_left, {
                    [sliderStyles.thumb_zindex_5]: actualLeft > max - 100,
                })}
                onMouseDown={setActualValuesToInnerState}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newLeftSliderPositionInPercents = Math.min(
                        +event.target.value,
                        actualRight - 1,
                    );
                    setInnerSelectedLeft(newLeftSliderPositionInPercents);
                }}
            />
            <input
                type="range"
                min={0}
                max={100}
                value={Math.ceil(actualRight)}
                ref={rightSliderRef}
                style={thumbStyles}
                className={classnames(sliderStyles.thumb, sliderStyles.thumb_right)}
                onMouseDown={setActualValuesToInnerState}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newRightSliderPositionInPercents = Math.max(
                        +event.target.value,
                        actualLeft + 1,
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
