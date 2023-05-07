import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setData } from 'state/features/dataLayers';
import { initialObjectsState } from 'state/constants/dataLayers';

import { lines } from 'common/data/lines/lines';
import { LineType } from 'common/data/lines/lineType';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { Loader } from 'components/UI/Loader/Loader';
import { FilterType } from 'components/UI/Filters/Filters.types';

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
            const sortedLinesCount = linesFilters.sort((a, b) => b[1] - a[1]) as LinesCountEntries;

            setLinesCount(sortedLinesCount);
        });
    }, []);

    const onLinesChange = useCallback(
        (lineType: LineType) => () => {
            dispatchLines({ type: 'toggle', lineType });
        },
        [],
    );

    useEffect(() => {
        const lineTypes = Object.entries(linesState).reduce((acc, [type, value]) => {
            if (value) {
                acc.push(type);
            }

            return acc;
        }, []) as LineType[];

        if (!lineTypes.length) {
            dispatch(
                setData({
                    type: FilterType.Line,
                    data: initialObjectsState.line.data,
                }),
            );

            return;
        }

        Promise.all([lines.getLinePolylines(lineTypes), lines.getLineObjects(lineTypes)]).then(
            ([polylines, points]) => {
                const concatenatedLines = [].concat(...polylines);
                dispatch(
                    setData({
                        type: FilterType.Line,
                        data: {
                            lines: concatenatedLines,
                            points,
                        },
                    }),
                );
            },
        );
    }, [dispatch, linesState]);

    return linesCount ? (
        <>
            {linesCount.map(([type, count], i) => (
                <>
                    <Checkbox
                        id={`${type}-line-${i}`}
                        checked={linesState[type]}
                        color={LINES_CONFIG[type].color}
                        onClick={onLinesChange(type)}
                    >
                        {type}
                        <span className={styles.LinesFilter__objectsCount}>{count}</span>
                        <br />
                        <small className={styles.LinesFilter__description}>
                            {LINES_CONFIG[type].description}
                        </small>
                    </Checkbox>
                    <div className={styles.LinesFilter__checkboxContent} />
                </>
            ))}
        </>
    ) : (
        // TODO: replace with FilterLoader component after it's merge
        <div style={{ height: 128 }}>
            <Loader />
        </div>
    );
}
