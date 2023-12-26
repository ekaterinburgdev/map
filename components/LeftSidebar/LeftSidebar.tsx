import React from 'react';
import { Filters } from 'components/Filters/Filters';
import styles from './LeftSidebar.module.css';

export function LeftSidebar() {
    return (
        <div className={styles.leftSidebar}>
            <Filters />
        </div>
    );
}
