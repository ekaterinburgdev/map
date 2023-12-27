import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { getPercent } from '../utils';
import { HistogramData, HistogramDatum, MinMax, Range } from '../types';
import barchartStyles from './BarChart.module.css';

interface Props {
    height: number;
    data: HistogramData;
    minValue: number;
    maxValue: number;
    onSelect?: (item: Range) => void;
    sliderMinMax: MinMax;
}

export function BarChart({ data, sliderMinMax, height, onSelect, minValue, maxValue }: Props) {
    const [minMaxInternal, setMinMaxInternal] = useState<MinMax>();

    const [minMax, setMinMax] = useState<MinMax>({
        min: minValue,
        max: maxValue,
    });

    useEffect(() => {
        setMinMax(minMaxInternal);
    }, [minMaxInternal]);

    useEffect(() => {
        setMinMax(sliderMinMax);
    }, [sliderMinMax]);

    const total = data.reduce((acc, item) => acc + item.value, 0);
    const max = Math.max(...data.map((item) => item.value));

    const items = data.map((item) => ({
        ...item,
        percent: getPercent(0, total, item.value),
        height: getPercent(0, max, item.value),
        isActive: item.from >= minMax.min && item.to <= minMax.max,
    }));

    const selected = useRef(false);

    const onMouseDown = (item: HistogramDatum) => {
        selected.current = true;
        onSelect?.(item);
        setMinMaxInternal({
            min: item.from,
            max: item.to,
        });
    };

    const onMouseEnter = (item: HistogramDatum) => {
        if (selected.current === true) {
            onSelect({
                from: Math.min(minMax.min, item.from),
                to: Math.max(minMax.max, item.to),
            });
            setMinMaxInternal({
                min: Math.min(minMax.min, item.from),
                max: Math.max(minMax.max, item.to),
            });
        }
    };

    const onMouseUp = () => {
        selected.current = false;
    };

    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp);

        return () => window.removeEventListener('mouseup', onMouseUp);
    }, []);

    return (
        <div className={barchartStyles.barchart} style={{ height }}>
            {items.map((item) => (
                <div
                    key={item.from}
                    className={barchartStyles.barchart__itemWrapper}
                    onMouseDown={() => {
                        onMouseDown(item);
                    }}
                    onMouseEnter={() => {
                        onMouseEnter(item);
                    }}
                >
                    <div
                        aria-hidden
                        className={classnames(barchartStyles.barchart__item, {
                            [barchartStyles.barchart__item_active]: item.isActive,
                        })}
                        style={{
                            height: `${item.height}%`,
                            color: item.color,
                            position: 'static',
                        }}
                    >
                        <div className={barchartStyles.barchart__percent}>
                            {Intl.NumberFormat('ru-RU').format(item.percent)}
                            &thinsp;%
                        </div>
                        <div className={barchartStyles.barchart__value}>{item.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
