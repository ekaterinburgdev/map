/* eslint-disable */

import React from 'react';
import {MapItem, MapItemType} from 'common/types/map-item';
import { MARKER_FILTER_COLOR } from 'common/constants/colors';
import styles from './Info.module.css';

interface Props {
    placemark: MapItem
}

export function Info({ placemark: { type, name, description } }: Props) {
    const text = name !== description ? description : null;
    const color = MARKER_FILTER_COLOR[MapItemType[type]];

    return (
        <div className={styles.info}>
            {MapItemType[type] && <div className={styles.info__type} style={{ color }}>{MapItemType[type]}</div>}
            {text && <div className={styles.info__description}>{text}</div>}
        </div>
    );
}
