import React from 'react';
import styles from './Close.module.css';

interface Props {
    close: VoidFunction;
}

export function Close({ close }: Props) {
    return (
        <button type="button" aria-label="Close" onClick={close} className={styles.close}>
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
    );
}
