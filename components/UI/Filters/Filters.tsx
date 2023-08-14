import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterConfigItem, FilterType } from 'components/UI/Filters/Filters.types';
import { Toggle } from 'components/UI/Filters/components/Toggle/Toggle';
import { Filter } from 'components/UI/Filters/components/Filter/Filter';
import { FILTERS_CONFIG } from 'components/UI/Filters/Filters.config';
import { activeFilterSelector } from 'state/features/selectors';
import { toggleData } from 'state/features/dataLayers';
import styles from './Filters.module.css';

export function Filters() {
    const dispatch = useDispatch();

    const onToggleClick = useCallback(
        (type: FilterType) => {
            dispatch(toggleData({ type }));
        },
        [dispatch],
    );

    const activeFilter = useSelector(activeFilterSelector);

    return (
        <div className={styles.filters__body}>
            {(Object.entries(FILTERS_CONFIG) as [FilterType, FilterConfigItem][]).map(
                ([type, { component: Component, title, source, isVerified }], idx) => {
                    const id = `id:${type}-${idx}`;
                    const isActive = type === activeFilter;

                    const sourceHost = source && new URL(source.link).host;

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
                                {!isVerified && <div className={styles.filters__notice}>Данные {source && <a href={source.link} target="_blank" rel="noreferrer">{sourceHost}</a>} содержат неточности. <a href="https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none">Оставьте фидбек</a> — помогите улучшить карту</div>}
                                {isActive && <Component />}
                            </Filter>
                        </div>
                    );
                },
            )}
        </div>
    );
}
