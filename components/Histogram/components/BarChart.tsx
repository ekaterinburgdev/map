import React from 'react';
import classnames from 'classnames';
import { getPercent } from '../utils';
import { HistogramData, HistogramDatum, Range } from '../types';
import barchartStyles from './BarChart.module.css';

interface Props {
    data: HistogramData;
    range: Range;
    height: number;
    onClickItem?: (item: HistogramDatum) => void;
}

export function BarChart({ data, range, height, onClickItem }: Props) {
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
                    aria-hidden
                    key={item.from}
                    onClick={() => onClickItem?.(item)}
                    onKeyUp={() => onClickItem?.(item)}
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
