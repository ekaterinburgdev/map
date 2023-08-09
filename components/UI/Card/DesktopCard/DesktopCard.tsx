import React, { useContext } from 'react';
import { MapContext } from 'components/UI/Map/providers/MapProvider';
import { Card } from 'components/UI/Card/Card';
import { Close } from '../../Close';
import styles from './DesktopCard.module.css';

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
            <Card />
        </div>
    );
}
