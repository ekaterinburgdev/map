import React from 'react';

import styles from './MapLoader.module.css';

export function MapLoader() {
    return (
        <div className={styles.MapLoader} aria-live="polite">
            Загрузка&nbsp;данных...
        </div>
    );
}
