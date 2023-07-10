import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterConfigItem, FilterType } from 'components/UI/Filters/Filters.types';
import { Toggle } from 'components/UI/Filters/components/Toggle/Toggle';
import { Filter } from 'components/UI/Filters/components/Filter/Filter';
import { FILTERS_CONFIG } from 'components/UI/Filters/Filters.config';
import { toggleData } from 'state/features/dataLayers';
import { State } from 'common/types/state';
import styles from './Filters.module.css';

export function Filters() {
    const dispatch = useDispatch();

    const onToggleClick = useCallback(
        (type: FilterType) => {
            dispatch(toggleData({ type }));
        },
        [dispatch],
    );

    const dataLayer = useSelector((state: State) => state.dataLayer);

    return (
        <div className={styles.filters__body}>
            {(Object.entries(FILTERS_CONFIG) as [FilterType, FilterConfigItem][]).map(
                ([type, { component: Component, title }], idx) => {
                    const id = `id:${type}-${idx}`;
                    const isActive = type === dataLayer.activeFilter;

                    return (
                        <div key={id} className={styles.filters__item}>
                            <Toggle
                                id={id}
                                isActive={isActive}
                                onClick={onToggleClick}
                                type={type}
                                label={title}
                            />
                            <Filter isActive={isActive}>
                                {isActive && <Component />}
                            </Filter>
                        </div>
                    );
                },
            )}
        </div>
    );
}
