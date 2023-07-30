import React from 'react';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import { TeamGrid } from './TeamGrid';

export function Team() {
    return (
        <div className={styles.team}>
            <h4 className={styles.h4}>Команда</h4>
            <div className={styles.paragraphs}>
                <p className={styles.largeText}>В нашей команде крутые ребята из IT-компаний Екатеринбурга и других городов. Мы ждём профессионалов, которые будут улучшать город вместе.</p>
            </div>
            <TeamGrid />
        </div>
    );
}
