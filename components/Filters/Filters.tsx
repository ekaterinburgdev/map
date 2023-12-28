import React from 'react';
import { FilterConfigItem, FilterType } from 'types/Filters.types';
import { Toggle } from 'components/Filters/components/Toggle/Toggle';
import { Filter } from 'components/Filters/components/Filter/Filter';
import styles from './Filters.module.css';

interface Props {
    filters: Record<FilterType, FilterConfigItem>;
    activeFilter: FilterType;
    onToggleClick: (type: FilterType) => void;
}

export function Filters({ filters, activeFilter, onToggleClick }: Props) {
    return (
        <div className={styles.filters__body}>
            {(Object.entries(filters) as [FilterType, FilterConfigItem][]).map(
                ([type, { component, title, isVerified }], idx) => {
                    const id = `id:${type}-${idx}`;
                    const isActive = type === activeFilter;

                    return (
                        <div key={id} className={styles.filters__item}>
                            <Toggle
                                id={id}
                                isActive={isActive}
                                onClick={onToggleClick}
                                type={type}
                                label={title}
                            />
                            {component && (
                                <Filter isActive={isActive}>
                                    {isActive ? component : null}
                                    {!isVerified && (
                                        <div className={styles.filters__notice}>
                                            Данные берутся из&nbsp;публичных источников
                                            и&nbsp;содержат неточности.{' '}
                                            <a href="https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none">
                                                Оставьте&nbsp;фидбек
                                            </a>
                                            &nbsp;— помогите улучшить карту.
                                        </div>
                                    )}
                                </Filter>
                            )}
                        </div>
                    );
                },
            )}
        </div>
    );
}
