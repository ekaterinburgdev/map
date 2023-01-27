/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import FocusLock from 'react-focus-lock';
import styles from './styles.module.css';
import { ALL_PROJECTS } from './constants';
import { Project, Theme } from './types';
import { Projects } from './Projects';

const defaultTheme = {
    background: 'black',
    color: 'white',
};

interface Props {
    activeProjectId: string;
    projects?: Project[];
    theme?: Theme;
    isDarkIcons?: boolean;
}

export function ProjectsPanel({
    theme = defaultTheme,
    projects = ALL_PROJECTS,
    activeProjectId,
    isDarkIcons = false,
}: Props) {
    const activeProject = projects.find((project) => project.id === activeProjectId);

    const [openMenu, setOpenMenu] = useState(false);
    const toggle = useCallback(() => setOpenMenu(!openMenu), [setOpenMenu, openMenu]);
    const close = useCallback(() => setOpenMenu(false), []);

    useEffect(() => {
        function onEsc(event: KeyboardEvent) {
            if (event.key === 'Escape' && openMenu) {
                close();
            }
        }

        window.addEventListener('keyup', onEsc);

        return () => {
            window.removeEventListener('keyup', onEsc);
        };
    }, [close, openMenu]);

    if (!activeProject) {
        return null;
    }

    return (
        <FocusLock disabled={!openMenu}>
            <div
                className={classNames(styles.panel, {
                    [styles.panel_active]: openMenu,
                })}
            >
                <div onClick={close} className={styles.panel__overlay} />
                <div
                    style={{ backgroundColor: theme.background, color: theme.color }}
                    className={styles.panel__modal}
                >
                    <div className={styles.panel__scroller}>
                        <Projects projects={projects} isDarkIcons={isDarkIcons} />
                    </div>
                    <div className={styles.panel__divider} />
                    <div className={styles.panel__subcontent}>
                        <a
                            href="https://ekaterinburg.io/"
                            className={styles.panel__link}
                            style={{ color: theme.color }}
                        >
                            Все проекты
                        </a>
                    </div>
                </div>
                <div className={styles.panel__toggle}>
                    <div
                        className={styles.toggle}
                        style={{ backgroundColor: theme.background, color: theme.color }}
                    >
                        <button type="button" className={styles.toggle__control} onClick={toggle}>
                            Меню
                        </button>
                        <a
                            href={activeProject.link}
                            className={classNames(
                                styles.toggle__activeproject,
                                styles.activeproject,
                            )}
                            style={{ backgroundColor: theme.color, color: theme.background }}
                        >
                            <img
                                src={isDarkIcons ? activeProject.logoDark : activeProject.logoLight}
                                className={styles.activeproject__logo}
                                alt={activeProject.fullTitle}
                            />
                            <div className={styles.activeproject__title}>
                                {activeProject.fullTitle}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </FocusLock>
    );
}
