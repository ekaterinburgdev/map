import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

export enum ButtonType {
    BLACK = 'black',
    YELLOW = 'yellow',
}

export enum ButtonPaddings {
    SMALL = 'small',
    LARGE = 'large',
}

const buttonStylesByType: Record<ButtonType, any> = {
    [ButtonType.BLACK]: styles.button_black,
    [ButtonType.YELLOW]: styles.button_yellow,
};

const buttonStylesByPaddings: Record<ButtonPaddings, any> = {
    [ButtonPaddings.SMALL]: styles.button_paddings_small,
    [ButtonPaddings.LARGE]: styles.button_paddings_large,
};

type TButtonProps = {
    text: string;
    type: ButtonType;
    paddings: ButtonPaddings;
    onClick: VoidFunction;
    link?: string;
};

export function Button({ text, type, paddings, onClick, link }: TButtonProps) {
    const className = classNames(styles.button, buttonStylesByType[type], buttonStylesByPaddings[paddings]);

    if (link) {
        return (
            <a className={className} href={link}>{text}</a>
        );
    }
    return (
        <button type="button" className={className} onClick={onClick}>{text}</button>
    );
}
