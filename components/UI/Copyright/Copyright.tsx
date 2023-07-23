import React from 'react';
import { useSelector } from 'react-redux';
import { activeFilterSelector } from 'state/features/selectors';
import { SOURCES_BY_TYPE } from 'common/constants/sources';
import { FilterType } from '../Filters/Filters.types';
import styles from './Copyright.module.css';

function getSource(activeFilter) {
    switch (activeFilter) {
        case FilterType.HouseAge:
        case FilterType.HouseFloor:
        case FilterType.HouseWearTear:
            return SOURCES_BY_TYPE.howoldthishouse.link;

        case FilterType.DTP:
            return SOURCES_BY_TYPE.dtp.link;

        case FilterType.DesignCode:
            return SOURCES_BY_TYPE.ekaterinburgdesign.link;

        case FilterType.OKN:
            return SOURCES_BY_TYPE.okn.link;

        default:
            return null;
    }
}

export function Copyright() {
    const activeFilter = useSelector(activeFilterSelector);
    const copyright = getSource(activeFilter);

    return (
        <div className={styles.copyright}>
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
                OpenStreetMap
            </a>
            {' · '}
            {copyright && (
                <a
                    href={copyright}
                    target="_blank"
                    rel="noreferrer"
                >
                    {new URL(copyright).host}
                </a>
            )}
        </div>
    );
}
