import React, { useCallback, useReducer, useState } from 'react';

import { DesignCodeItemType } from 'common/data/designCode/designCodeObject';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';
import { Checkbox } from 'components/UI/Checkbox/Checkbox';

import { DESIGN_CODE_ITEMS_COLORS } from '../DesignCode.constants';

import { designCodeReducer, designCondeInitalState } from './DesignCodeFilter.state';

import styles from './DesignCodeFilter.module.css';

export function DesignCodeFilter() {
    // const dispatch = useDispatch();
    const [designCodeFilterState, dispatchDesignCodeAction] = useReducer(
        designCodeReducer,
        designCondeInitalState,
    );
    const [objectsCount] = useState<[DesignCodeItemType, number][]>(null);

    const onChange = useCallback(
        (designCodeItemType: DesignCodeItemType) => async () => {
            dispatchDesignCodeAction({ type: 'toggle', designCodeItemType });
        },
        [],
    );

    return objectsCount ? (
        <>
            {objectsCount.map(([type, count], i) => (
                <Checkbox
                    id={`design-code-${i}`}
                    checked={designCodeFilterState[type]}
                    color={DESIGN_CODE_ITEMS_COLORS[type]}
                    onClick={onChange(type)}
                    mix={styles.DesignCodeFilter__checkboxContent}
                    key={`filter-design-code-${type}`}
                >
                    {type}
                    <span className={styles.DesignCodeFilter__objectsCount}>{count}</span>
                </Checkbox>
            ))}
        </>
    ) : (
        <FilterLoader />
    );
}
