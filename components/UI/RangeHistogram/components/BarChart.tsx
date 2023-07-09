import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { getPercent } from '../utils';
import { HistogramData, MinMax, Range } from '../types';
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
    const [innerSelectedMinMax, setInnerSelectedMinMax] = useState<MinMax>();

    const [actualMinMax, setActualMinMax] = useState<MinMax>({
        min: minValue,
        max: maxValue,
    });

    useEffect(() => {
        setActualMinMax(innerSelectedMinMax);
    }, [innerSelectedMinMax]);

    useEffect(() => {
        setActualMinMax(sliderMinMax);
    }, [sliderMinMax]);

    const total = data.reduce((acc, item) => acc + item.value, 0);
    const max = Math.max(...data.map((item) => item.value));

    const items = data.map((item) => ({
        ...item,
        percent: getPercent(0, total, item.value),
        height: getPercent(0, max, item.value),
        isActive: item.from >= actualMinMax.min && item.to <= actualMinMax.max,
    }));

    return (
        <div className={barchartStyles.barchart} style={{ height }}>
            {items.map((item) => (
                <div
                    aria-hidden
                    key={item.from}
                    onClick={() => {
                        onSelect?.(item);
                        setInnerSelectedMinMax({
                            min: item.from,
                            max: item.to,
                        });
                    }}
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
            ))}
        </div>
    );
}
