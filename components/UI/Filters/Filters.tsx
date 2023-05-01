import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MapItemType } from 'common/types/map-item';
import { State } from 'common/types/state';
import { MODEL_CONFIG } from 'components/Model/config';
import { toggleData } from 'state/features/dataLayers';

import { Welcome } from '../Welcome/Welcome';
import { Toggle } from './components/Toggle/Toggle';
import { Filter } from './components/Filter/Filter';

import styles from './Filters.module.css';

export function Filters() {
    const dispatch = useDispatch();

    const onToggleClick = useCallback(
        (type: MapItemType) => {
            dispatch(toggleData({ type }));
        },
        [dispatch],
    );

    const dataLayer = useSelector((state: State) => state.dataLayer);

    return (
        <div className={styles.filters}>
            <div className={styles.filters__notification}>
                <Welcome />
            </div>

            <div className={styles.filters__body}>
                {MODEL_CONFIG.map(({ filters, type }) =>
                    filters.map(({ title, component: FilterComponent }, idx: number) => {
                        const id = `id:${type}-${idx}`;

                        return (
                            <div key={id} className={styles.filters__item}>
                                <Toggle onClick={onToggleClick} type={type} id={id} label={title} />
                                <Filter isActive={dataLayer[type].isActive}>
                                    <FilterComponent />
                                </Filter>
                            </div>
                        );
                    }))}
            </div>
        </div>
    );
}
