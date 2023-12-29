import React, { useEffect } from 'react';
import { IconType, SheetModal } from 'sloy-ui';
import { Icon } from 'sloy-ui';
import { AboutProjectContent } from 'features/About/AboutProjectContent';
import { useIsDesktop } from 'helpers/isDesktop';
import styles from './AboutProjectModal.module.css';

export function AboutProjectModal({ close, isOpened }: { close: VoidFunction; isOpened: boolean }) {
    const isDesktop = useIsDesktop();

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

    if (!isDesktop) {
        return (
            <SheetModal snapPoints={[0.8]} fullHeight isOpen={isOpened} onClose={close}>
                <AboutProjectContent />
            </SheetModal>
        );
    }

    return (
        <>
            <div className={styles.aboutProjectModal} role="dialog" aria-modal="true">
                <div className={styles.aboutProjectModalClose} onClick={close}>
                    <Icon type={IconType.Close} />
                </div>
                <AboutProjectContent />
            </div>
            <div className={styles.backdrop} onClick={close} aria-hidden />
        </>
    );
}
