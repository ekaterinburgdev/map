import React from 'react';
import { Team } from 'components/UI/NewModal/Team';
import { Partners } from 'components/UI/NewModal/Partners';
import { JoinUs } from 'components/UI/NewModal/JoinUs';
import styles from './NewModal.module.css';

type TNewModalProps = {
    isOpen: boolean;
    onClose: VoidFunction;
};

export function NewModal({ isOpen, onClose }: TNewModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.newModal}>
                <div className={styles.newModal__content}>
                    <h3 className={styles.h3}>Раскрываем город в деталях</h3>
                    <div className={styles.paragraphs}>
                        <p className={styles.largeText}>Мы - Код Екатеринбурга. Сообщество независимых энтузиастов, которые хотят сделать Екатеринбург лучше.</p>
                        <p className={styles.largeText}>Поиск, сбор и визуализация данных занимают огромное количество времени, а результат этой работы обычно никуда не публикуется.</p>
                        <p className={styles.largeText}>Наша цель - разработать платформу, на которой будут собраны различные данные о городе: возраст домов, этажность, объекты культурного наследия, ДТП и много чего ещё.</p>
                        <p className={styles.largeText}>Мы создаём единую базу данных о городе, визуализируя его и превращая неочевидную информацию в понятную и доступную.</p>
                    </div>
                    <Team />
                    <Partners />
                    <JoinUs />
                </div>
            </div>
            <div className={styles.backdrop} onClick={onClose} />
        </>
    );
}
