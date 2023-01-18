import React from 'react';
import classnames from 'classnames';
import { getPercent } from '../utils';
import { HistogramData, Range } from '../types';
import barchartStyles from './BarChart.module.css';

interface Props {
    data: HistogramData;
    range: Range;
    height: number;
}

export function BarChart({ data, range, height }: Props) {
    const max = Math.max(...data.map((item) => item.value));

    const items = data.map((item) => ({
        ...item,
        height: getPercent(0, max, item.value),
        isActive: item.from >= range.min && item.to <= range.max,
    }));

    return (
        <div className={barchartStyles.barchart} style={{ height }}>
            {items.map((item) => (
                <div
                    key={item.from}
                    className={classnames({
                        [barchartStyles.barchart__item]: true,
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
