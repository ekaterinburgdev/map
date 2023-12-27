import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setFilter } from 'state/features/dataLayers';
import { FilterType } from 'types/Filters.types';
import { lines } from 'features/Lines/lines';
import { Checkbox } from 'shared/UI/Checkbox/Checkbox';
import { FilterLoader } from 'shared/UI/Loader/FilterLoader';

import { LineType } from '../lineType';
import { LINES_CONFIG } from '../Lines.constants';
import { linesInitalState, linesReducer } from './LinesFilter.state';
import styles from './LinesFilter.module.css';

type LinesCountEntries = [LineType, number][];

export function LinesFilter() {
    const dispatch = useDispatch();
    const [linesState, dispatchLines] = useReducer(linesReducer, linesInitalState);
    const [linesCount, setLinesCount] = useState<LinesCountEntries>(null);

    useEffect(() => {
        lines.getFilters().then((linesFilters: LinesCountEntries) => {
            const sortedLinesCount = linesFilters.sort(([, countA], [, countB]) => countB - countA);

            setLinesCount(sortedLinesCount);
        });
    }, []);

    useEffect(() => {
        dispatch(
            setFilter({
                activeFilter: FilterType.Line,
                activeFilterParams: linesState,
            }),
        );
    }, [dispatch, linesState]);

    const onLinesChange = useCallback(
        (lineType: LineType) => () => {
            dispatchLines({ type: 'toggle', lineType });
        },
        [],
    );

    if (!linesCount) return <FilterLoader />;

    return (
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
    );
}
