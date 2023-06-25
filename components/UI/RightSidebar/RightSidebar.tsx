import React from 'react';
import styles from './RightSidebar.module.css';
import { DesktopCard } from 'components/UI/Card';

export function RightSidebar() {
    return (
        <div className={styles.rightSidebar}>
            <DesktopCard />
        </div>
    );
}
