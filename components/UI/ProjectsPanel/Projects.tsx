/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './Projects.module.css';
import { ALL_PROJECTS } from './constants';
import { Project } from './types';

interface Props {
    projects?: Project[];
    isDarkIcons?: boolean;
}

export function Projects({ projects = ALL_PROJECTS, isDarkIcons = false }: Props) {
    return (
        <div className={styles.projects}>
            <ul className={styles.projects__list}>
                {projects.map((project) => (
                    <li className={styles.projects__item} key={project.shortTitle}>
                        <a href={project.link} className={styles.project} key={project.shortTitle}>
                            <img
                                src={isDarkIcons ? project.logoDark : project.logoLight}
                                className={styles.project__logo}
                                alt={project.shortTitle}
                            />
                            <div className={styles.project__title}>{project.shortTitle}</div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
