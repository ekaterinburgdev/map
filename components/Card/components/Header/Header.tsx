import React, { useMemo } from 'react';

import { IconType } from 'shared/UI/Icons/Icons.types';
import { useCopyHref } from 'shared/helpers/useCopyHref';

import { Label } from '../Label/Label';

import styles from './Header.module.css';
import { HeaderProps } from './Header.types';

const COPY_RESET_TIMEOUT = 2000;

export function Header({ coordinates, title, description }: HeaderProps) {
    const { isCopied: isLinkCopied, onCopy: onCopyLink } = useCopyHref(
        window.location.href,
        COPY_RESET_TIMEOUT,
    );

    const coordsString = useMemo(() => {
        if (!coordinates) {
            return null;
        }

        const coords = Array.isArray(coordinates[0]) ? coordinates[0] : coordinates;

        return `${coords[0]?.toFixed(6)}, ${coords[1]?.toFixed(6)}`;
    }, [coordinates]);
    const { isCopied: isCoordsCopied, onCopy: onCopyCoords } = useCopyHref(
        coordsString,
        COPY_RESET_TIMEOUT,
    );

    return (
        <>
            <div className={styles.header}>
                {coordsString && (
                    <Label
                        color="#9baac3"
                        backgroundColor="rgba(85, 100, 125, 0.24)"
                        onClick={onCopyCoords}
                        icon={IconType.Copy}
                    >
                        {isCoordsCopied ? 'Скопировано' : coordsString}
                    </Label>
                )}
                <Label
                    color="#9baac3"
                    backgroundColor="rgba(85, 100, 125, 0.24)"
                    onClick={onCopyLink}
                    icon={IconType.Link}
                >
                    {isLinkCopied ? 'Скопировано' : 'Ссылка на объект'}
                </Label>
            </div>
            <h2 className={styles.header__title}>{title}</h2>
            {description && <p className={styles.header__description}>{description}</p>}
        </>
    );
}
