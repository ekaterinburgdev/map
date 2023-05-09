import React from 'react';

import { Loader } from 'components/UI/Loader/Loader';

import styles from './Loader.module.css';

export function CardLoader() {
    return (
        <div className={styles.CardLoaderContainer}>
            <Loader radius={180} />
        </div>
    );
}
