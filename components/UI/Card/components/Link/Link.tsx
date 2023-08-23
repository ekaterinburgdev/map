import React from 'react';
import styles from './Link.module.css';

type TLinkProps = {
    text?: string;
    href: string;
};

export function Link({ href, text }: TLinkProps) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className={styles.link}>
            {text || href}
        </a>
    );
}
