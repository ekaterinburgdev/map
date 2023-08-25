import React, { useCallback, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { FilterType } from 'types/Filters.types';
import { setFilter } from 'state/features/dataLayers';

import designCode from '../../../../public/ekb-design-code.json';
import { DESIGN_CODE_ITEMS_COLORS } from '../DesignCode.constants';
import { DesignCodeItemType } from '../designCodeObject';
import { designCodeReducer, designCondeInitalState } from './DesignCodeFilter.state';
import styles from './DesignCodeFilter.module.css';

const DESIGN_CODE_ITEMS = groupBy(designCode.features, (item) => item.properties.type);

export function DesignCodeFilter() {
    const dispatch = useDispatch();
    const [designCodeFilterState, dispatchDesignCodeAction] = useReducer(
        designCodeReducer,
        designCondeInitalState,
    );

    const onChange = useCallback(
        (designCodeItemType: DesignCodeItemType) => async () => {
            dispatchDesignCodeAction({ type: 'toggle', designCodeItemType });
        },
        [],
    );

    useEffect(() => {
        dispatch(
            setFilter({
                activeFilter: FilterType.DesignCode,
                activeFilterParams: designCodeFilterState,
            }),
        );
    }, [designCodeFilterState, dispatch]);

    return (
        <div>
            {Object.entries(DESIGN_CODE_ITEMS).map(([type, items], i) => (
                <Checkbox
                    id={`design-code-${i}`}
                    checked={designCodeFilterState[type]}
                    color={DESIGN_CODE_ITEMS_COLORS[type]}
                    // @ts-ignore
                    onClick={onChange(type)}
                    mix={styles.DesignCodeFilter__checkboxContent}
                    key={`filter-design-code-${type}`}
                >
                    {type}
                    <span className={styles.DesignCodeFilter__objectsCount}>{items.length}</span>
                </Checkbox>
            ))}
        </div>
    );
}
