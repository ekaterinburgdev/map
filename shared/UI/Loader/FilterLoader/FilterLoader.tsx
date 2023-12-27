import React from 'react';

import { Loader } from 'shared/UI/Loader/Loader';

import styles from './FilterLoader.module.css';

export function FilterLoader() {
    return (
        <div className={styles.FilterLoaderContainer}>
            <Loader />
        </div>
    );
}
