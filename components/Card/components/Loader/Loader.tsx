import React from 'react';

import { Loader } from 'shared/UI/Loader/Loader';

import styles from './Loader.module.css';

export function CardLoader() {
    return (
        <div className={styles.CardLoaderContainer}>
            <Loader radius={180} />
        </div>
    );
}
