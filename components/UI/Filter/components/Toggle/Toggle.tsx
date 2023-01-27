import React from 'react';

import styles from './Toggle.module.css';

export function Toggle({ id, label }: any) {
    return (
        <label className={styles.toggle} htmlFor={id}>
            {label}
            <input id={id} className={styles.toggle__background} type="checkbox" checked />
            <span className={styles.toggle__control} />
        </label>
    );
}
