import React from 'react';
import { IconType } from 'components/UI/Icons/Icons.types';
import { Icon } from 'components/UI/Icons';
import styles from './Button.module.css';

type TButtonProps = {
    text: string;
    icon?: IconType;
};

export function Button({ text, icon }: TButtonProps) {
    return (
        <button type="button" className={styles.button}>
            {icon && <Icon type={icon} color="#9baac3" />}
            {text}
        </button>
    );
}
