import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { getPercent } from '../utils';
import { HistogramData, MinMax, Range } from '../types';
import barchartStyles from './BarChart.module.css';

interface Props {
    data: HistogramData;
    sliderRange: MinMax;
    height: number;
    min: number;
    maxValue: number;
    onSelect?: (item: Range) => void;
}

export function BarChart({ data, sliderRange, height, onSelect, min, maxValue }: Props) {
    const [lastClickedMinMax, setLastClickedMinMax] = useState<MinMax>();

    const [actualMinMax, setActualMinMax] = useState<MinMax>({
        min,
        max: maxValue,
    });

    useEffect(() => {
        setActualMinMax(lastClickedMinMax);
    }, [lastClickedMinMax]);

    useEffect(() => {
        setActualMinMax(sliderRange);
    }, [sliderRange]);

    const max = Math.max(...data.map((item) => item.value));

    const items = data.map((item) => ({
        ...item,
        height: getPercent(0, max, item.value),
        isActive: item.from >= actualMinMax.min && item.to <= actualMinMax.max,
    }));

    useEffect(() => {
        console.log({ items, sliderRange: sliderRange });
    }, [items, sliderRange]);

    const selected = useRef(false);

    // const onMouseDown = (item) => {
    //     console.log('mouse down');
    //     console.log({ from: item.from, to: item.to });
    //     console.log('--------');
    //     selected.current = true;
    //     onSelect(item);
    // };

    // const onMouseEnter = (item) => {
    //     console.log('mouse enter');
    //     if (selected.current === true) {
    //         const from = Math.min(sliderRange.min, item.from);
    //         const to = Math.max(sliderRange.max, item.to);
    //         console.log('mouse enter selected.current');
    //         console.log({ from, to });
    //         console.log('--------');
    //         onSelect({
    //             from: Math.min(sliderRange.min, item.from),
    //             to: Math.max(sliderRange.max, item.to),
    //         });
    //     }
    // };
    //
    // const onMouseUp = () => {
    //     console.log('mouse up');
    //     console.log('---------');
    //     selected.current = false;
    // };

    // useEffect(() => {
    //     window.addEventListener('mouseup', onMouseUp);
    //
    //     return () => window.removeEventListener('mouseup', onMouseUp);
    // }, []);

    return (
        <div className={barchartStyles.barchart} style={{ height }}>
            {items.map((item) => (
                <div
                    aria-hidden
                    key={item.from}
                    onClick={() => {
                        console.log('on click');
                        console.log({ from: item.from, to: item.to });
                        console.log('--------');
                        onSelect?.(item);
                        setLastClickedMinMax({
                            min: item.from,
                            max: item.to,
                        });
                    }}
                    // onKeyUp={() => {
                    //     console.log('key up');
                    //     console.log({ from: item.from, to: item.to });
                    //     console.log('--------');
                    //     onSelect?.(item);
                    // }}
                    // onMouseDown={() => onMouseDown(item)}
                    // onMouseEnter={() => onMouseEnter(item)}
                    className={classnames(barchartStyles.barchart__item, {
                        [barchartStyles.barchart__item_active]: item.isActive,
                    })}
                    style={{
                        height: `${item.height}%`,
                        color: item.color,
                    }}
                >
                    <div className={barchartStyles.barchart__label}>{item.value}</div>
                </div>
            ))}
        </div>
    );
}
