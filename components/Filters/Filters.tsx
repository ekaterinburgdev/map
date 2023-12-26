import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterConfigItem, FilterType } from 'types/Filters.types';
import { Toggle } from 'components/Filters/components/Toggle/Toggle';
import { Filter } from 'components/Filters/components/Filter/Filter';
import { FILTERS_CONFIG } from 'components/Layers/Filters.config';
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
                      Данные берутся из&nbsp;публичных источников и&nbsp;содержат неточности.{' '}
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
