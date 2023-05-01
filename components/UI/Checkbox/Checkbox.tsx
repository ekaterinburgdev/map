import React, { CSSProperties, ReactNode } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
    id: string;
    color: string;
    label: ReactNode;
    onClick: () => void;
}

export function Checkbox({ id, color, label, onClick }: CheckboxProps) {
    return (
        <label
            className={styles.checkbox}
            htmlFor={id}
            style={{ '--checkbox-color': color } as CSSProperties}
        >
            <input
                id={id}
                type="checkbox"
                className={styles.checkbox__input}
                onClick={onClick}
            />
            <span className={styles.checkbox__box} />

            <div className={styles.checkbox__label}>
                {label}
            </div>
        </label>
    );
}
