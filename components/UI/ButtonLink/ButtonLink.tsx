import React from 'react';
import { IconType } from 'components/UI/Icons/Icons.types';
import { Icon } from 'components/UI/Icons';
import styles from 'components/UI/ButtonLink/ButtonLink.module.css';

type TButtonLinkProps = {
    text: string;
    link: string;
    icon?: IconType;
};

export function ButtonLink({ text, link, icon }: TButtonLinkProps) {
    return (
        <a className={styles.buttonLink} href={link}>
            {icon && <Icon type={icon} color="#9baac3" />}
            {text}
        </a>
    );
}
