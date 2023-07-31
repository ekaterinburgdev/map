import React from 'react';
import Image from 'next/image';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import { Team } from 'components/UI/AboutProjectModal/Team';
// import { Partners } from 'components/UI/AboutProjectModal/Partners';
import { JoinUs } from 'components/UI/AboutProjectModal/JoinUs';
import mapService from './svg/map-service.svg';

type TNewModalProps = {
    isOpen: boolean;
    onClose: VoidFunction;
};

export function AboutProjectModal({ isOpen, onClose }: TNewModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.aboutProjectModal}>
                <div className={styles.aboutProjectModal__content}>
                    <div className={styles.serviceName}>
                        <Image src={mapService} alt="Карта Екатеринбурга" />
                        <p>Карта <br /> Екатеринбурга</p>
                    </div>
                    <h3 className={styles.h3}>Раскрываем город в деталях</h3>
                    <div className={styles.paragraphs}>
                        <p className={styles.largeText}>Мы создаём единую базу данных о городе, визуализируем её и превращаем неочевидную информацию в понятную и доступную.</p>
                        <p className={styles.largeText}>Наша цель - разработать платформу, на которой будут собраны различные данные о городе: возраст домов, этажность, объекты культурного наследия, ДТП и много чего ещё.</p>
                        <p className={styles.largeText}>Проект является полностью открытым. Кто угодно может его контрибьютить или форкнуть. Заходите на гитхаб.</p>
                    </div>
                    <h4 className={styles.h4}>Планы</h4>
                    <div className={styles.paragraphs}>
                        <p className={styles.largeText}>Это бета-версия сервиса. В будущем мы планируем добавить новые слои данных, показывать сразу несколько слоёв, разработать API, визуализировать все города в мире и много чего ещё. Чтобы ничего не пропустить подписывайтесь на телеграм-канал.</p>
                        <p className={styles.largeText}>Если у вас есть предложения, что ещё добавить или улучшить, оставьте фидбек.</p>
                    </div>
                    <Team />
                    {/* <Partners /> */}
                    <JoinUs />
                </div>
            </div>
            <div className={styles.backdrop} onClick={onClose} />
        </>
    );
}
