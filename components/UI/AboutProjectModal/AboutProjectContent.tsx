import Image from 'next/image';
import React from 'react';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import mapService from 'components/UI/AboutProjectModal/svg/map-service.svg';
import { Button, ButtonSize, ButtonType } from '../Button/Button';
import { TeamGrid } from './Team/TeamGrid';

export function AboutProjectContent() {
    return (
        <article className={styles.aboutProjectModal__content}>
            <div className={styles.serviceName}>
                <Image src={mapService} alt="" />
                <p>Карта <br /> Екатеринбурга</p>
            </div>

            <h2>Раскрываем город в&nbsp;деталях</h2>
            <p>Когда был построен ваш дом? Как много высоких зданий в&nbsp;центре? Сколько в&nbsp;городе объектов культурного наследия? Где чаще всего происходят ДТП? Чтобы ответить на&nbsp;эти и&nbsp;миллион других вопросов, мы&nbsp;разработали карту Екатеринбурга&nbsp;&mdash; сервис, где собраны и&nbsp;визуализированы все данные о&nbsp;городе.</p>
            <p>Проект является полностью открытым. Кто угодно может в&nbsp;него законтрибьютить или форкнуть. Заходите на&nbsp;<a href="https://github.com/ekaterinburgdev/map" target="_blank" rel="noreferrer">гитхаб</a>.</p>

            <h3>Цель</h3>
            <p>Мы&nbsp;создаём единую базу данных о&nbsp;городе, визуализируем её&nbsp;и&nbsp;превращаем неочевидную информацию в&nbsp;понятную и&nbsp;доступную.</p>

            <h3>Планы</h3>
            <p>Это бета-версия сервиса. В&nbsp;будущем мы&nbsp;планируем добавить новые слои данных, показывать сразу несколько слоёв, разработать API, визуализировать данные обо всех городах в&nbsp;мире и&nbsp;много чего ещё. Чтобы ничего не&nbsp;пропустить подписывайтесь на&nbsp;<a href="https://t.me/ekaterinburgdev" target="_blank" rel="noreferrer">телеграм-канал</a>.</p>
            <p>Если у&nbsp;вас есть предложения, что ещё добавить или улучшить, оставьте <a href="https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none" target="_blank" rel="noreferrer">фидбек</a>.</p>

            <h3>Источники данных</h3>
            <p>Мы&nbsp;используем данные из&nbsp;открытых источников. У&nbsp;нас настроено автообновление данных, поэтому информация на&nbsp;карте всегда актуальна. Все используемые источники перечислены ниже. Если у&nbsp;вас есть своя уникальная база данных и&nbsp;вы&nbsp;хотите поделиться ей&nbsp;с&nbsp;нами, напишите, пожалуйста, на&nbsp;почту <a href="mailto:mail@ekaterinburg.city">mail@ekaterinburg.city</a>. А&nbsp;мы&nbsp;обязательно укажем ваше авторство.</p>

            <h3>Команда проекта</h3>
            <p>Мы&nbsp;&mdash; Код Екатеринбурга. Сообщество независимых энтузиастов, которые хотят сделать Екатеринбург лучше.</p>
            <p>В&nbsp;нашей команде участвуют крутые ребята из&nbsp;IT-компаний Екатеринбурга и&nbsp;других городов. И&nbsp;мы&nbsp;всегда ждём новых профессионалов, чтобы развивать город вместе. Если вы&nbsp;аналитик данных, гис-аналитик, бекендер, дизайнер интерфейсов, дизайнер карт или эксперты по&nbsp;парсингу данных, приходите к&nbsp;нам!</p>

            <TeamGrid />

            <footer>
                <h3 className={styles.h3}>Присоединяйся к нам</h3>
                <Button text="Стать частью команды или помочь проекту" type={ButtonType.YELLOW} size={ButtonSize.LARGE} onClick={() => { }} link="https://tally.so#tally-open=wL9Vd1&tally-width=650&tally-overlay=1&tally-emoji-animation=none" />
            </footer>
        </article>
    );
}
