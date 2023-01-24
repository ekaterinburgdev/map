import React, { useMemo } from 'react';
import classNames from 'classnames';

import { IconType } from 'components/UI/Icons/Icons.types';

import { Icon } from 'components/UI/Icons';
import styles from './Label.module.css';

export type LabelProps = {
    color: string;
    backgroundColor: string;
    icon?: IconType;
    onClick?: () => void;
};

export function Label({
    color,
    backgroundColor,
    icon,
    onClick,
    children,
}: React.PropsWithChildren<LabelProps>) {
    const style = useMemo(
        () => ({
            color,
            backgroundColor,
        }),
        [color, backgroundColor],
    );

    return (
        <div
            className={classNames(styles.label, {
                [styles.label_clickable]: Boolean(onClick),
            })}
            style={style}
            onClick={onClick}
        >
            {children}
            {icon && <Icon type={icon} color={color} />}
        </div>
    );
}
