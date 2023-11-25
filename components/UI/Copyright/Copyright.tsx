import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { MapContext } from 'components/Map/providers/MapProvider';
import { activeFilterSelector } from 'state/features/selectors';
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
            {copyright?.map((elem) => (
                <a key={elem.link} href={elem.link} target="_blank" rel="noreferrer">
                    {elem.name}
                </a>
            ))}
        </div>
    );
}
