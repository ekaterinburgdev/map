import React from 'react';

import styles from './Notification.module.css';

export function Notification() {
    return (
        <div className={styles.notification}>
            <h2 className={styles.notification__heading}>
                Привет! Это&nbsp;инфокарта Екатеринбурга
            </h2>
            <p className={styles.notification__text}>
                Вся информация о&nbsp;городе теперь собрана в&nbsp;одном месте: возраст домов,
                объекты культурного наследия, дтп&nbsp;&mdash; всё на&nbsp;свете.
                Для начала просто настройте фильтр ниже или кликните на
                &nbsp;любой дом на&nbsp;карте.
            </p>
            <button type="button" className={styles.notification__close}>
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
