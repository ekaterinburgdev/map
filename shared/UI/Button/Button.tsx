import classNames from 'classnames';
import styles from './Button.module.css';

export enum ButtonType {
    BLACK = 'black',
    YELLOW = 'yellow',
}

export enum ButtonSize {
    SMALL = 'small',
    LARGE = 'large',
}

const buttonStylesByType: Record<ButtonType, any> = {
    [ButtonType.BLACK]: styles.button_black,
    [ButtonType.YELLOW]: styles.button_yellow,
};

const buttonStylesBySize: Record<ButtonSize, any> = {
    [ButtonSize.SMALL]: styles.button_size_small,
    [ButtonSize.LARGE]: styles.button_size_large,
};

type TButtonProps = {
    text?: string;
    type: ButtonType;
    size: ButtonSize;
    onClick: VoidFunction;
    link?: string;
    children?: React.ReactNode;
};

export function Button({ text, type, size, onClick, link, children }: TButtonProps) {
    const className = classNames(styles.button, buttonStylesByType[type], buttonStylesBySize[size]);

    if (link) {
        return (
            <a className={className} href={link} target="_blank" rel="noreferrer">
                {text || children}
            </a>
        );
    }

    return (
        <button type="button" className={className} onClick={onClick}>
            {text}
        </button>
    );
}
