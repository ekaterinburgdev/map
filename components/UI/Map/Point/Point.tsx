import React, { memo, useCallback, useMemo } from 'react';
import { Marker as LeafletMarker } from 'react-leaflet';
import L from 'leaflet';
import classNames from 'classnames';

import { NO_PREVIEW_SIZE, SIZE_BY_LETTER } from './Point.constants';
import { PointProps, Sizes } from './Point.types';

import styles from './Point.module.css';

function PointComponent({
    position,
    isOpen,
    openPopup,
    closePopup,
    color,
    size = Sizes.M,
    id,
    type,
    preview,
    name,
}: PointProps) {
    const onClick = useCallback(() => {
        if (isOpen) {
            closePopup();
        } else {
            openPopup(id, type);
        }
    }, [id, type, closePopup, openPopup, isOpen]);

    const sizeNumber = useMemo(() => {
        if (!preview && size !== Sizes.XS) {
            return isOpen ? NO_PREVIEW_SIZE.open : NO_PREVIEW_SIZE.closed;
        }

        return isOpen ? SIZE_BY_LETTER[size].open : SIZE_BY_LETTER[size].closed;
    }, [size, isOpen, preview]);
    const html = useMemo(() => {
        const style = `
            width:${sizeNumber}px;
            height:${sizeNumber}px;
            color:${color};
        `;

        const className = classNames(styles.point, {
            [styles.point_open]: isOpen,
            [styles.point_size_xs]: size === Sizes.XS,
            [styles.point_size_s]: size === Sizes.S,
            [styles.point_size_m]: size === Sizes.M,
            [styles.point_noPreview]: !preview,
        });

        if (preview) {
            return `<img
                src="${preview}"
                class="${className}"
                style="${style}"
                alt="${name || 'Превью объекта'}"
            />`;
        }

        const noPreviewStyle = `
            width:${sizeNumber}px;
            height:${sizeNumber}px;
            background-color:${color};
        `;

        return `<div class="${className}" style="${noPreviewStyle}"></div>`;
    }, [isOpen, size, color, sizeNumber, preview, name]);

    const icon = new L.DivIcon({
        popupAnchor: [0, -5],
        iconSize: [sizeNumber, sizeNumber],
        html,
    });

    return (
        <LeafletMarker
            zIndexOffset={isOpen ? 9999 : undefined}
            icon={icon}
            position={position}
            eventHandlers={{
                click: openPopup && closePopup ? onClick : undefined,
            }}
        />
    );
}

export const Point = memo(PointComponent);
