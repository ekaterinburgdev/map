import classNames from 'classnames';
import React, { CSSProperties, useCallback } from 'react';
import { HistogramData, HistogramDatum, MinMax } from '../types';
import axisStyles from './Axis.module.css';

interface Props {
    data: HistogramData;
    units: string;
    range: MinMax;
    onSelect?: (item: { from: HistogramDatum['from']; to: HistogramDatum['to'] }) => void;
}

export function Axis({ data, units, range, onSelect }: Props) {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClick = useCallback(
        (from: number) => {
            if (from === lastItem.to) {
                onSelect?.(lastItem);
            } else {
                const selectedItem = data.find((dataItem) => dataItem.from === from);

                onSelect?.({ from, to: selectedItem.to });
            }
        },
        [data, lastItem, onSelect],
    );

    return (
        <div
            className={axisStyles.axis}
            style={
                {
                    '--axis-item-basis': `${100 / labels.length}%`,
                } as CSSProperties
            }
        >
            {labels.map((item, i) => {
                const isFirst = i === 0;
                const isLast = i === labels.length - 1;
                return (
                    <div
                        aria-hidden
                        key={item.value}
                        // onClick={() => onClick?.(item.value)}
                        // onKeyUp={() => onClick?.(item.value)}
                        className={classNames(axisStyles.axis__item, {
                            [axisStyles.axis__item_active]: item.isActive,
                        })}
                    >
                        {item.value}{(isFirst || isLast) && <>&thinsp;{units}</>}
                    </div>
                );
            })}
        </div>
    );
}
