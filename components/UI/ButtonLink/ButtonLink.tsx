import React from 'react';
import classNames from 'classnames';
import { IconType } from 'components/UI/Icons/Icons.types';
import { Icon } from 'components/UI/Icons';
import styles from 'components/UI/ButtonLink/ButtonLink.module.css';

type TButtonLinkProps = {
    text: string;
    link: string;
    icon?: IconType;
    additionalStyles?: string;
};

export function ButtonLink({ text, link, icon, additionalStyles }: TButtonLinkProps) {
    return (
        <a className={classNames(styles.buttonLink, additionalStyles)} href={link}>
            {icon && <Icon type={icon} color="#9baac3" />}
            {text}
        </a>
    );
}
