import React from 'react';
import classNames from 'classnames';

import styles from './Welcome.module.css';

export function Welcome({ onClose }: { onClose: () => void }) {
    return (
        <div className={classNames(styles.welcome)}>
            <h2 className={styles.welcome__heading}>Привет! Это&nbsp;инфокарта Екатеринбурга</h2>
            <p className={styles.welcome__text}>
                Вся информация о&nbsp;городе теперь собрана в&nbsp;одном месте: возраст домов,
                объекты культурного наследия, дтп&nbsp;&mdash; всё на&nbsp;свете. Для начала просто
                настройте фильтр ниже или кликните на &nbsp;любой дом на&nbsp;карте.
            </p>
            <button type="button" className={styles.welcome__close} onClick={onClose}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 17.12 17.12"
                >
                    <path
                        d="M1.06,1.06l15,15m0-15-15,15"
                        fill="none"
                        stroke="white"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                    />
                </svg>
            </button>
        </div>
    );
}
