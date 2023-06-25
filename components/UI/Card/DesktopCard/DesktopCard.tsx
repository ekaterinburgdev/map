import React, { useContext } from 'react';
import styles from './DesktopCard.module.css';
import { Close } from './Close';
import { MapContext } from 'components/UI/Map/providers/MapProvider';
import { CardContent } from '../CardContent';

export function DesktopCard() {
    const { popupId, closePopup } = useContext(MapContext);

    if (!popupId) {
        return <></>;
    }

    return (
        <div className={styles.DesktopCard}>
            <div className={styles.DesktopCard__header}>
                <Close close={closePopup} />
            </div>
            <CardContent />
        </div>
    );
}
