import React from 'react';
import { MapItem } from 'common/types/map-item';
import { MARKER_FILTER_COLOR } from 'common/constants/colors';
import styles from './Info.module.css';

interface Props {
    placemark: MapItem
}

export function Info({ placemark: { type, name, description } }: Props) {
    const text = name !== description ? description : null;
    const color = MARKER_FILTER_COLOR[type];

    return (
        <div className={styles.info}>
            {type && <div className={styles.info__type} style={{ color }}>{type}</div>}
            {text && <div className={styles.info__description}>{text}</div>}
        </div>
    );
}
