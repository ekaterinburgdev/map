import React, { useContext } from 'react';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import { AboutProjectContent } from 'components/UI/AboutProjectModal/AboutProjectContent';
import { AboutProjectContext } from 'components/providers/AboutProjectProvider';
import { Close } from 'components/UI/Close';

export function AboutProjectModal() {
    const { close, isOpened } = useContext(AboutProjectContext);

    if (!isOpened) return null;

    return (
        <>
            <div className={styles.aboutProjectModal}>
                <Close close={close} />
                <AboutProjectContent />
            </div>
            <div className={styles.backdrop} onClick={close} />
        </>
    );
}
