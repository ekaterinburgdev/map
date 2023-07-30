import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

export enum ButtonType {
    BLACK = 'black',
    YELLOW = 'yellow',
}

const buttonStylesByType: Record<ButtonType, any> = {
    [ButtonType.BLACK]: styles.button_black,
    [ButtonType.YELLOW]: styles.button_yellow,
};

type TButtonProps = {
    text: string;
    type: ButtonType;
    onClick: VoidFunction;
    link?: string;
};

export function Button({ text, type, onClick, link }: TButtonProps) {
    if (link) {
        return (
            <a className={classNames(styles.button, buttonStylesByType[type])} href={link}>{text}</a>
        );
    }
    return (
        <button className={classNames(styles.button, buttonStylesByType[type])} onClick={onClick}>{text}</button>
    );
}
