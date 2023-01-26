import React from 'react';
import { ProjectsPanel, PROJECT_MAP } from '../ProjectsPanel';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <div className={styles.footer}>
            <ProjectsPanel activeProjectId={PROJECT_MAP.id} isDarkIcons />
        </div>
    );
}
