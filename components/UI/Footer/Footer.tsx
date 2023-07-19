import React from 'react';
import { ProjectsPanel, ALL_PROJECTS, PROJECT_MAP, Theme } from 'ekb';

export function Footer() {
    return (
        <ProjectsPanel
            projects={ALL_PROJECTS}
            activeProjectId={PROJECT_MAP.id}
            theme={Theme.DARK}
            style={{ left: '8px', bottom: '8px' }}
        />
    );
}
