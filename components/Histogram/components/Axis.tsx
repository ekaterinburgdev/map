import classNames from 'classnames';
import React from 'react';
import { HistogramData, HistogramDatum, Range } from '../types';
import axisStyles from './Axis.module.css';

interface Props {
    data: HistogramData;
    range: Range;
    onClickItem?: (item: { from: HistogramDatum['from']; to: HistogramDatum['to'] }) => void;
}

export function Axis({ data, range, onClickItem }: Props) {
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
            onClickItem?.(lastItem);
        } else {
            onClickItem?.({ from, to: from + 1 });
        }
    };

    return (
        <div className={axisStyles.axis}>
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
