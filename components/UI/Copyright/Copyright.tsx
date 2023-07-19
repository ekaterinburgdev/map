import React from 'react';
import { useSelector } from 'react-redux';
import { activeFilterSelector } from 'state/features/selectors';
import { FilterType } from '../Filters/Filters.types';
import styles from './Copyright.module.css';

export function Copyright() {
    const activeFilter = useSelector(activeFilterSelector);

    return (
        <div className={styles.copyright}>
            {activeFilter === FilterType.HouseAge && (
                <a
                    href="https://kontikimaps.ru/how-old/dataset?p=h-ekb"
                    target="_blank"
                    rel="noreferrer"
                >
                    © how-old-is-this.house
                    {' '}
                    {'| '}
                </a>
            )}

            <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
                OSM
            </a>
        </div>
    );
}
