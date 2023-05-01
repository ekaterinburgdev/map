import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { State } from 'common/types/state';
import { toggleData } from 'state/features/dataLayers';

import { Welcome } from '../Welcome/Welcome';
import { Toggle } from './components/Toggle/Toggle';
import { Filter } from './components/Filter/Filter';

import styles from './Filters.module.css';
import { FILTERS_CONFIG } from './Filters.config';
import { FilterConfigItem, FilterType } from './Filters.types';

export function Filters() {
    const [isWelcomeClosed, setIsWelcomeClosed] = useState(false);

    const onClose = useCallback(() => {
        setIsWelcomeClosed(true);
    }, []);

    const dispatch = useDispatch();

    const onToggleClick = useCallback(
        (type: FilterType) => {
            dispatch(toggleData({ type }));
        },
        [dispatch],
    );

    const dataLayer = useSelector((state: State) => state.dataLayer);

    return (
        <div className={styles.filters}>
            {!isWelcomeClosed && (
                <div className={styles.filters__notification}>
                    <Welcome onClose={onClose} />
                </div>
            )}

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
                                    <Component />
                                </Filter>
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
}
