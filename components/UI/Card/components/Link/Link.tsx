import React from 'react';
import styles from './Link.module.css';

type TLinkProps = {
    text?: string;
    link: string;
};

export function Link({ link, text }:TLinkProps) {
    return (
        <a href={link} target="_blank" rel="noreferrer" className={styles.link}>
            {text || link}
        </a>
    );
}
