import React from 'react';
import { DesktopCard } from 'components/Card';
import styles from './RightSidebar.module.css';

export function RightSidebar() {
    return (
        <div className={styles.rightSidebar}>
            <DesktopCard />
        </div>
    );
}
