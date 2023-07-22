import React from 'react';
import { ProjectsPanel, PRODUCTION_PROJECTS, PROJECT_MAP, Theme } from 'ekb';

export function Footer() {
    return (
        <ProjectsPanel
            projects={PRODUCTION_PROJECTS}
            activeProjectId={PROJECT_MAP.id}
            theme={Theme.DARK}
            style={{ left: '8px', bottom: '8px' }}
        />
    );
}
