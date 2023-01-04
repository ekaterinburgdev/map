/* eslint-disable no-console */
import React, { memo, useMemo } from 'react';
import { Marker as LeafletMarker } from 'react-leaflet';
import L from 'leaflet';
import classNames from 'classnames';
import { MapItemType } from 'common/types/map-item';
import { MARKER_COLOR } from 'common/constants/colors';
import { IMapContext } from '../providers/MapProvider';
import styles from './Marker.module.css';

interface Props {
    id: string;
    name: string;
    type: MapItemType;
    x: number;
    y: number;
    preview: string | null;
    isOpen: boolean;
    openPopup: IMapContext['openPopup'];
    closePopup: IMapContext['closePopup'];
}

function Placemark({
    id, type, x, y, name, preview, isOpen, openPopup, closePopup,
}: Props) {
    const onClick = () => {
        if (isOpen) {
            closePopup();
        } else {
            openPopup(id);
        }
    };
    const size = isOpen ? 64 : 40;
    const html = useMemo(() => {
        const style = `
            width:${size}px;
            height:${size}px;
            color:${MARKER_COLOR[MapItemType[type]]};
        `;

        const className = classNames(styles.marker, {
            [styles.marker_open]: isOpen,
        });

        if (preview) {
            return `<img
                src="${preview}"
                class="${className}"
                style="${style}"
                alt="${name}"
            />`;
        }

        return `<div class="${className}" style="${style}" />`;
    }, [isOpen, name, preview, size, type]);

    const icon = new L.DivIcon({
        popupAnchor: [0, -5],
        iconSize: [size, size],
        html,
    });

    return (
        <LeafletMarker
            zIndexOffset={isOpen ? 9999 : undefined}
            icon={icon}
            position={[x, y]}
            eventHandlers={{ click: onClick }}
        />
    );
}

export const Marker = memo(Placemark);