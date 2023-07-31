import React, { useContext } from 'react';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import { AboutProjectContent } from 'components/UI/AboutProjectModal/AboutProjectContent';
import { AboutProjectContext } from 'components/providers/AboutProjectProvider';

export function AboutProjectModal() {
    const { close, isOpened } = useContext(AboutProjectContext);

    if (!isOpened) return null;

    return (
        <>
            <div className={styles.aboutProjectModal}>
                <AboutProjectContent />
            </div>
            <div className={styles.backdrop} onClick={close} />
        </>
    );
}
