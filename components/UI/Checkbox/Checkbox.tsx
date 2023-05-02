import React, { CSSProperties, ReactNode } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
    id: string;
    checked: boolean;
    color: string;
    children: ReactNode;
    onClick: () => void;
}

export function Checkbox({ id, checked, color, children, onClick }: CheckboxProps) {
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
                checked={checked}
            />
            <span className={styles.checkbox__box} />

            <div className={styles.checkbox__label}>
                {children}
            </div>
        </label>
    );
}
