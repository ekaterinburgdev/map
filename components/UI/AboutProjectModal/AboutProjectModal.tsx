import React, { useContext, useEffect } from 'react';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import { AboutProjectContent } from 'components/UI/AboutProjectModal/AboutProjectContent';
import { AboutProjectContext } from 'state/providers/AboutProjectProvider';
import { Close } from 'components/UI/Close';

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
