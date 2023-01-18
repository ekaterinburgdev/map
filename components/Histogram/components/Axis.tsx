import classNames from 'classnames';
import React from 'react';
import { HistogramData, Range } from '../types';
import axisStyles from './Axis.module.css';

interface Props {
    data: HistogramData;
    range: Range;
}

export function Axis({ data, range }: Props) {
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

    return (
        <div className={axisStyles.axis}>
            {labels.map((item) => (
                <div
                    key={item.value}
                    className={classNames({
                        [axisStyles.axis__item]: true,
                        [axisStyles.axis__item_active]: item.isActive,
                    })}
                >
                    {item.value}
                </div>
            ))}
        </div>
    );
}
