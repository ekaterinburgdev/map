import React, { useCallback } from 'react';

import { MapItemType } from 'common/types/map-item';

import styles from './Toggle.module.css';

export interface ToggleProps {
    id: string;
    label: string;
    onClick: (type: MapItemType) => void;
    type: MapItemType;
}

export function Toggle({ id, label, onClick, type }: ToggleProps) {
    const onChange = useCallback(() => {
        onClick(type);
    }, [type, onClick]);

    return (
        <label className={styles.toggle} htmlFor={id}>
            {label}
            <input
                id={id}
                className={styles.toggle__background}
                type="checkbox"
                onChange={onChange}
            />
            <span className={styles.toggle__control} />
        </label>
    );
}
