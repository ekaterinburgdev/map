/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';
import React from 'react';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
    {
        name: 'telegram',
        img: '/social/telegram-white.svg',
        link: 'https://t.me/ekaterinburgdesign',
    },
    {
        name: 'instagram',
        img: '/social/instagram-white.svg',
        link: 'https://www.instagram.com/ekaterinburg.design',
    },
    {
        name: 'vk',
        img: '/social/vk-white.svg',
        link: 'https://vk.com/ekaterinburg.design',
    },
    {
        name: 'youtube',
        img: '/social/youtube-white.svg',
        link: 'https://www.youtube.com/c/ekaterinburgdesign',
    },
    {
        name: 'zen',
        img: '/social/zen-white.svg',
        link: 'https://zen.yandex.ru/ekaterinburgdesign',
    },
    {
        name: 'fb',
        img: '/social/fb-white.svg',
        link: 'https://www.facebook.com/ekaterinburg.design',
    },
    {
        name: 'behance',
        img: '/social/behance-white.svg',
        link: 'https://www.behance.net/ekaterinburgdesign',
    },
    {
        name: 'github',
        img: '/social/github-white.svg',
        link: 'https://github.com/ekaterinburgdev',
    },
];

export function Footer() {
    return (
        <div className={styles.footer}>
            <a className={styles.footerlogo} href="https://ekaterinburg.design/">
                <img
                    className={styles.footerlogo__image}
                    src="/social/logo-transparent.svg"
                    alt="Ekaterinburg.design"
                />
                <div className={styles.footerlogo__caption}>
                    Дизайн-код
                    <br />
                    Екатеринбурга
                </div>
            </a>
            <div className={styles.footerlinks}>
                {SOCIAL_LINKS.map((item) => (
                    <a
                        className={styles.footerlinks__item}
                        href={item.link}
                        rel="noreferrer noopener"
                        target="_blank"
                        key={item.name}
                    >
                        <img className={styles.footerlinks__image} src={item.img} alt={item.name} />
                    </a>
                ))}
                <a
                    className={classNames(styles.footerlinks__item, styles.footerlinks__action)}
                    href="mailto:mail@ekaterinburg.design"
                >
                    Написать нам
                </a>
            </div>
        </div>
    );
}
