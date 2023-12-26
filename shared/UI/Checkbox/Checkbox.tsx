import React, { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.css';

export interface CheckboxProps {
    id: string;
    checked: boolean;
    color: string;
    children: ReactNode;
    onClick: () => void;
    mix?: string;
}

export function Checkbox({ id, checked, color, children, onClick, mix }: CheckboxProps) {
    return (
        <label
            className={classNames(styles.checkbox, mix)}
            htmlFor={id}
            style={{ '--checkbox-color': color } as CSSProperties}
        >
            <input
                id={id}
                type="checkbox"
                className={styles.checkbox__input}
                onChange={onClick}
                checked={checked}
            />
            <span className={styles.checkbox__box} />

            <div className={styles.checkbox__label}>{children}</div>
        </label>
    );
}
