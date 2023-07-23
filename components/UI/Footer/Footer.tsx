import React from 'react';
import { ProjectsPanel, PROJECT_MAP, PRODUCTION_PROJECTS, Theme } from 'ekb';

export function Footer() {
    return (
        <ProjectsPanel
            projects={[PROJECT_MAP, ...PRODUCTION_PROJECTS]}
            activeProjectId={PROJECT_MAP.id}
            theme={Theme.DARK}
            style={{ left: '8px', bottom: '8px' }}
        />
    );
}
