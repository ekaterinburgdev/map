import React from 'react';
import { TeamGrid } from 'components/UI/NewModal/TeamGrid/TeamGrid';
import styles from './NewModal.module.css';

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
