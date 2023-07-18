/* eslint-disable */

import React, { ReactNode, useEffect } from 'react';
import Sheet from 'react-modal-sheet';

import styles from './Modal.module.css';

interface Props {
    children: ReactNode;
    isOpen: boolean;
    close: VoidFunction;
    size?: number;
}

export function Modal({ isOpen, close, size = 0.8, children }: Props) {
    useEffect(() => {
        const onKeyup = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                close();
            }
        };

        window.addEventListener('keyup', onKeyup);

        return () => {
            window.removeEventListener('keyup', onKeyup);
        };
    }, [isOpen, close]);

    return (
        <Sheet snapPoints={[size, 0]} detent="content-height" isOpen={isOpen} onClose={close}>
            <Sheet.Container className={styles.reactModalSheetContainer}>
                <Sheet.Header className={styles.reactModalSheetHeader}>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={close}
                        className={styles.close}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 17.12 17.12"
                        >
                            <path
                                d="M1.06,1.06l15,15m0-15-15,15"
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit={10}
                                strokeWidth={3}
                            />
                        </svg>
                    </button>
                </Sheet.Header>
                <Sheet.Content disableDrag className={styles.reactModalSheetContent}>
                    {children}
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={close} className={styles.reactModalSheetBackdrop} />
        </Sheet>
    );
}
