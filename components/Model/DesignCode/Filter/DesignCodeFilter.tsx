import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setData } from 'state/features/dataLayers';

import { DesignCodeItemType } from 'common/data/designCode/designCodeObject';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { designCode } from 'common/data/designCode/designCode';

import { DESIGN_CODE_ITEMS_COLORS } from '../DesignCode.constants';

import { designCodeReducer, designCondeInitalState } from './DesignCodeFilter.state';

import styles from './DesignCodeFilter.module.css';

export function DesignCodeFilter() {
    const dispatch = useDispatch();
    const [designCodeFilterState, dispatchDesignCodeAction] = useReducer(
        designCodeReducer,
        designCondeInitalState,
    );
    const [objectsCount, setObjectsCount] = useState<[DesignCodeItemType, number][]>(null);

    const onChange = useCallback(
        (designCodeItemType: DesignCodeItemType) => async () => {
            dispatchDesignCodeAction({ type: 'toggle', designCodeItemType });
        },
        [],
    );

    useEffect(() => {
        const designCodeItemTypes = Object.entries(designCodeFilterState).reduce(
            (acc, [type, value]) => {
                if (value) {
                    acc.push(type);
                }

                return acc;
            },
            [],
        );

        if (!designCodeItemTypes.length) {
            dispatch(
                setData({
                    type: FilterType.DesignCode,
                    data: [],
                }),
            );

            return;
        }

        designCode.getObjectsByType(designCodeItemTypes).then((objects) => {
            dispatch(
                setData({
                    type: FilterType.DesignCode,
                    data: objects,
                }),
            );
        });
    }, [dispatch, designCodeFilterState]);

    useEffect(() => {
        designCode.getObjectsCount().then((objectsCountResult) => {
            const sortedObjectsCount = objectsCountResult.sort((a, b) => b[1] - a[1]);

            setObjectsCount(sortedObjectsCount);
        });
    }, []);

    return objectsCount ? (
        <div>
            {objectsCount.map(([type, count], i) => (
                <>
                    <Checkbox
                        id={`design-code-${i}`}
                        checked={designCodeFilterState[type]}
                        color={DESIGN_CODE_ITEMS_COLORS[type]}
                        onClick={onChange(type)}
                    >
                        {type}
                        <span className={styles.DesignCodeFilter__objectsCount}>{count}</span>
                    </Checkbox>
                    <div className={styles.DesignCodeFilter__checkboxContent} />
                </>
            ))}
        </div>
    ) : (
        <FilterLoader />
    );
}
