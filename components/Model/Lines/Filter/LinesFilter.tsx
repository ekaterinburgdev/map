import React, { useCallback, useEffect, useReducer, useState } from 'react';

import { lines } from 'common/data/lines/lines';
import { LineType } from 'common/data/lines/lineType';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';

import { LINES_CONFIG } from '../Lines.constants';

import { linesInitalState, linesReducer } from './LinesFilter.state';

import styles from './LinesFilter.module.css';

type LinesCountEntries = [LineType, number][];

export function LinesFilter() {
    const [linesState, dispatchLines] = useReducer(linesReducer, linesInitalState);
    const [linesCount, setLinesCount] = useState<LinesCountEntries>(null);

    useEffect(() => {
        lines.getFilters().then((linesFilters: LinesCountEntries) => {
            const sortedLinesCount = linesFilters.sort(([, countA], [, countB]) => countB - countA);

            setLinesCount(sortedLinesCount);
        });
    }, []);

    const onLinesChange = useCallback(
        (lineType: LineType) => () => {
            dispatchLines({ type: 'toggle', lineType });
        },
        [],
    );

    return linesCount ? (
        <>
            {linesCount.map(([type, count], i) => (
                <Checkbox
                    id={`${type}-line-${i}`}
                    checked={linesState[type]}
                    color={LINES_CONFIG[type].color}
                    onClick={onLinesChange(type)}
                    mix={styles.LinesFilter__checkboxContent}
                    key={`filter-${type}-line`}
                >
                    {type}
                    <span className={styles.LinesFilter__objectsCount}>{count}</span>
                    <br />
                    <small className={styles.LinesFilter__description}>
                        {LINES_CONFIG[type].description}
                    </small>
                </Checkbox>
            ))}
        </>
    ) : (
        <FilterLoader />
    );
}
