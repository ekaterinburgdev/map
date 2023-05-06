import React, { useMemo, memo, useCallback } from 'react';
import { Marker as LeafletMarker } from 'react-leaflet';
import L from 'leaflet';
import classNames from 'classnames';

import { SIZE_BY_LETTER } from './Point.constants';
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
}: PointProps) {
    const onClick = useCallback(() => {
        if (isOpen) {
            closePopup();
        } else {
            openPopup(id, type);
        }
    }, [id, type, closePopup, openPopup, isOpen]);

    const sizeNumber = useMemo(
        () => (isOpen ? SIZE_BY_LETTER[size].open : SIZE_BY_LETTER[size].closed),
        [size, isOpen],
    );
    const html = useMemo(() => {
        const style = `
            width:${sizeNumber}px;
            height:${sizeNumber}px;
            color:${color};
        `;

        const className = classNames(styles.point, {
            [styles.point_open]: isOpen,
            [styles.point_size_s]: size === Sizes.S,
            [styles.point_size_m]: size === Sizes.M,
            [styles.point_noPreview]: !preview,
        });

        if (preview) {
            return `<img
                src="${preview}"
                class="${className}"
                style="${style}"
                alt="Превью объекта"
            />`;
        }

        const noPreviewStyle = `background-color:${color};`;

        return `<div class="${className}" style="${noPreviewStyle}"></div>`;
    }, [isOpen, size, color, sizeNumber, preview]);

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
            eventHandlers={{ click: onClick }}
        />
    );
}

export const Point = memo(PointComponent);
