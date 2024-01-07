import React, { useContext, useEffect } from 'react';
import { AboutProjectContent } from 'features/About/AboutProjectContent';
import { AboutProjectContext } from 'features/About/AboutProjectProvider';
import { Close } from 'shared/UI/Close';
import styles from './AboutProjectModal.module.css';

export function AboutProjectModal() {
    const { close, isOpened } = useContext(AboutProjectContext);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') close();
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [close]);

    if (!isOpened) return null;

    return (
        <>
            <div className={styles.aboutProjectModal} role="dialog" aria-modal="true">
                <Close close={close} />
                <AboutProjectContent />
            </div>
            <div className={styles.backdrop} onClick={close} aria-hidden />
        </>
    );
}