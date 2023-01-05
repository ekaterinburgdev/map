/* eslint-disable */
import React from 'react';
import styles from './Copyright.module.css';

export function Copyright() {
    return (
        <div className={styles.copyright}>
            {'© '}
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>
            {' | '}
            <a href="https://leafletjs.com/" target="_blank" rel="noreferrer">Leaflet</a>
            {' | '}
            <a href="https://ekaterinburg.design/" target="_blank" rel="noreferrer">ekaterinburg.design</a>
        </div>
    );
}
