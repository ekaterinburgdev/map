import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import { getPercent } from '../utils';
import { HistogramData, MinMax, Range } from '../types';
import barchartStyles from './BarChart.module.css';

interface Props {
    data: HistogramData;
    range: MinMax;
    height: number;
    onSelect?: (item: Range) => void;
}

export function BarChart({ data, range, height, onSelect }: Props) {
    const max = Math.max(...data.map((item) => item.value));

    const items = data.map((item) => ({
        ...item,
        height: getPercent(0, max, item.value),
        isActive: item.from >= range.min && item.to <= range.max,
    }));

    const selected = useRef(false);

    const onMouseDown = (item) => {
        selected.current = true;
        onSelect(item);
    };

    const onMouseEnter = (item) => {
        if (selected.current === true) {
            onSelect({
                from: Math.min(range.min, item.from),
                to: Math.max(range.max, item.to),
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
                    aria-hidden
                    key={item.from}
                    onClick={() => onSelect?.(item)}
                    onKeyUp={() => onSelect?.(item)}
                    onMouseDown={() => onMouseDown(item)}
                    onMouseEnter={() => onMouseEnter(item)}
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
