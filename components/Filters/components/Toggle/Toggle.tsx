import { useCallback } from 'react';

import { FilterType } from 'types/Filters.types';

import styles from './Toggle.module.css';

export interface ToggleProps {
    id: string;
    label: string;
    onClick: (type: FilterType) => void;
    type: FilterType;
    isActive: boolean;
}

export function Toggle({ id, label, onClick, type, isActive }: ToggleProps) {
    const onChange = useCallback(() => {
        onClick(type);
    }, [onClick, type]);

    return (
        <label className={styles.toggle} htmlFor={id}>
            {label}
            <input
                id={id}
                className={styles.toggle__background}
                type="checkbox"
                checked={isActive}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (
                        e.key === 'Enter' ||
                        (e.key === 'ArrowRight' && !isActive) ||
                        (e.key === 'ArrowLeft' && isActive)
                    ) {
                        onChange();
                    }
                }}
            />
            <span className={styles.toggle__control} />
        </label>
    );
}
