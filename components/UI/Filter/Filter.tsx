import React from 'react';
import { Notification } from './components/Notification/Notification';
import { Toggle } from './components/Toggle/Toggle';
import styles from './Filter.module.css';

export function Filter() {
    return (
        <div className={styles.filter}>
            <div className={styles.filter__notification}>
                <Notification />
            </div>

            <div className={styles.filter__body}>
                {['«Дизайн-код Екатеринбурга»',
                    'Объекты культурного наследия',
                    'Цветные линии Екатеринбурга',
                    'Возраст домов',
                    'Этажность домов',
                    'Дорожно-транспортные происшествия',
                ].map((title, i) => (
                    <div className={styles.filter__item}>
                        <Toggle id={`id${i}`} label={title} />
                    </div>
                ))}

            </div>
        </div>
    );
}
