import React from 'react';
import { ProjectsPanel, PROJECT_MAP, Theme } from 'ekb';

export function Footer() {
    return (
        <ProjectsPanel
            activeProjectId={PROJECT_MAP.id}
            theme={Theme.DARK}
            style={{ left: '8px', bottom: '8px' }}
        />
    );
}
