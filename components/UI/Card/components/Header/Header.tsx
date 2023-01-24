import React, { useMemo } from 'react';

import { IconType } from 'components/UI/Icons/Icons.types';
import { useCopyHref } from 'components/helpers/useCopyHref';

import { MapItem } from 'common/types/map-item';
import { Label } from '../Label/Label';

import styles from './Header.module.css';

const COPY_RESET_TIMEOUT = 2000;

export type HeaderProps = {
    coordinates: MapItem['coords'];
    title: string;
    description?: string;
};

export function Header({ coordinates, title, description }: HeaderProps) {
    const { isCopied: isLinkCopied, onCopy: onCopyLink } = useCopyHref(
        window.location.href,
        COPY_RESET_TIMEOUT,
    );

    const coordsString = useMemo(
        () => `${coordinates[0]?.toFixed(6)}, ${coordinates[1]?.toFixed(6)}`,
        [coordinates],
    );
    const { isCopied: isCoordsCopied, onCopy: onCopyCoords } = useCopyHref(
        coordsString,
        COPY_RESET_TIMEOUT,
    );

    return (
        <>
            <div className={styles.header}>
                <Label
                    color="#9baac3"
                    backgroundColor="rgba(85, 100, 125, 0.24)"
                    onClick={onCopyCoords}
                    icon={IconType.Copy}
                >
                    {isCoordsCopied ? 'Скопировано' : coordsString}
                </Label>
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
