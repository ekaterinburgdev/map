import Image from 'next/image';
import React from 'react';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import mapService from 'components/UI/AboutProjectModal/svg/map-service.svg';
import { Team } from 'components/UI/AboutProjectModal/Team';
import { JoinUs } from 'components/UI/AboutProjectModal/JoinUs';

export function AboutProjectContent() {
    return (
        <div className={styles.aboutProjectModal__content}>
            <div className={styles.serviceName}>
                <Image src={mapService} alt="Карта Екатеринбурга" />
                <p>Карта <br /> Екатеринбурга</p>
            </div>
            <h3 className={styles.h3}>Раскрываем город в&nbsp;деталях</h3>
            <div className={styles.paragraphs}>
                <p className={styles.largeText}>Мы&nbsp;создаём единую базу данных о&nbsp;городе, визуализируем её&nbsp;и&nbsp;превращаем неочевидную информацию в&nbsp;понятную и&nbsp;доступную.</p>
                <p className={styles.largeText}>Наша цель&nbsp;&mdash; разработать платформу, на&nbsp;которой будут собраны различные данные о&nbsp;городе: возраст домов, этажность, объекты культурного наследия, ДТП и&nbsp;много чего ещё.</p>
                <p className={styles.largeText}>Проект является полностью открытым. Кто угодно может его контрибьютить или форкнуть. Заходите на&nbsp;<a href="https://github.com/ekaterinburgdev/map">гитхаб</a>.</p>
            </div>
            <h4 className={styles.h4}>Планы</h4>
            <div className={styles.paragraphs}>
                <p className={styles.largeText}>Это бета-версия сервиса. В&nbsp;будущем мы&nbsp;планируем добавить новые слои данных, показывать сразу несколько слоёв, разработать API, визуализировать все города в&nbsp;мире и&nbsp;много чего ещё. Чтобы ничего не&nbsp;пропустить подписывайтесь на&nbsp;телеграм-канал.</p>
                <p className={styles.largeText}>Если у&nbsp;вас есть предложения, что ещё добавить или улучшить, оставьте <a href="https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none">фидбек</a>.</p>
            </div>
            <Team />
            {/* <Partners /> */}
            <JoinUs />
        </div>
    );
}
