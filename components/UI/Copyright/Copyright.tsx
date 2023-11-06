import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { activeFilterSelector } from 'state/features/selectors';
import { MapContext } from 'components/Map/providers/MapProvider';
import { FILTERS_CONFIG } from '../../Layers/Filters.config';

import styles from './Copyright.module.css';

export function Copyright() {
    const { loading } = useContext(MapContext);
    const activeFilter = useSelector(activeFilterSelector);
    const copyright = FILTERS_CONFIG[activeFilter]?.source;

    return (
        <div className={styles.copyright} hidden={loading}>
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
                OpenStreetMap
            </a>
            {copyright && (
                <>
                    {' · '}
                    <a href={copyright.link} target="_blank" rel="noreferrer">
                        {new URL(copyright.link).host}
                    </a>
                </>
            )}
        </div>
    );
}
