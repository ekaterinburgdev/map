import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import { HistogramData, HistogramDatum, MinMax } from '../types';
import axisStyles from './Axis.module.css';

interface Props {
    data: HistogramData;
    range: MinMax;
    onSelect?: (item: { from: HistogramDatum['from']; to: HistogramDatum['to'] }) => void;
}

export function Axis({ data, range, onSelect }: Props) {
    const lastItem = data[data.length - 1];
    const labels = data
        .map((item) => ({
            value: item.from,
            isActive: item.from >= range.min && item.to - 1 <= range.max,
        }))
        .concat({
            value: lastItem.to,
            isActive: lastItem.from >= range.min && lastItem.to <= range.max,
        });

    const onClick = (from: number) => {
        if (from === lastItem.to) {
            onSelect?.(lastItem);
        } else {
            onSelect?.({ from, to: from + 1 });
        }
    };

    return (
        <div
            className={axisStyles.axis}
            style={
                {
                    '--axis-item-basis': `${100 / labels.length}%`,
                } as CSSProperties
            }
        >
            {labels.map((item) => (
                <div
                    aria-hidden
                    key={item.value}
                    onClick={() => onClick?.(item.value)}
                    onKeyUp={() => onClick?.(item.value)}
                    className={classNames(axisStyles.axis__item, {
                        [axisStyles.axis__item_active]: item.isActive,
                    })}
                >
                    {item.value}
                </div>
            ))}
        </div>
    );
}
