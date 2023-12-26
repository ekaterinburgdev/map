import React from 'react';
import { ProjectsPanel, PROJECT_MAP, PRODUCTION_PROJECTS, Theme } from 'ekb';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <div className={styles.footer}>
      <ProjectsPanel
        projects={PRODUCTION_PROJECTS}
        activeProjectId={PROJECT_MAP.id}
        theme={Theme.DARK}
      />
    </div>
  );
}
