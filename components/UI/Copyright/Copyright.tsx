/* eslint-disable */
import React from 'react';
import styles from './Copyright.module.css';

export function Copyright() {
    return (
        <div className={styles.copyright}>
            {'© '}
            <a
                href="https://kontikimaps.ru/how-old/dataset?p=h-ekb"
                target="_blank"
                rel="noreferrer"
            >
                how-old-is-this.house
            </a>
            {' | '}
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
                OpenStreetMap
            </a>
            {' | '}
            <a href="https://ekaterinburg.design/" target="_blank" rel="noreferrer">
                ekaterinburg.design
            </a>
        </div>
    );
}
