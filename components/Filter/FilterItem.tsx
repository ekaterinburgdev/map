import React, { useContext } from 'react';
import { MapItemType } from 'common/types/map-item';
import { MapContext } from 'components/Map/providers/MapProvider';

import styles from './Filter.module.css';

interface FilterItemProps {
    name: MapItemType;
    count: number;
    checked: boolean;
    color: string;
}

export function FilterItem({
    name, count, checked, color,
}: FilterItemProps) {
    const { selectedMarksTypes, filterMarks } = useContext(MapContext);

    const onChange = (e) => {
        if (e.target.checked) {
            filterMarks(selectedMarksTypes.concat(name));
        } else {
            filterMarks(selectedMarksTypes.filter((item) => item !== name));
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={styles.filteritem} key={name}>
            <input
                className={styles.filteritem__input}
                type="checkbox"
                defaultChecked={checked}
                onChange={onChange}
            />
            <span className={styles.filteritem__caption} style={{ color }}>
                <span className={styles['filteritem__caption-label']}>{name}</span>
                <span className={styles['filteritem__caption-counter']}>{count}</span>
            </span>
        </label>
    );
}
