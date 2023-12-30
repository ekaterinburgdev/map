import React from 'react';
import { Card } from 'components/Card/Card';
import { Close } from 'shared/UI/Close';
import { ContentConfig, MapItemType } from 'types/Content.types';
import styles from './DesktopCard.module.css';

interface Props {
    contentConfig: ContentConfig;
    popupId?: string;
    popupType: MapItemType | null;
    closePopup: () => void;
}

export function DesktopCard({ contentConfig, popupId, popupType, closePopup }: Props) {
    if (!popupId) {
        return <></>;
    }

    return (
        <div className={styles.DesktopCard}>
            <div className={styles.DesktopCard__header}>
                <Close close={closePopup} />
            </div>
            <Card popupId={popupId} popupType={popupType} contentConfig={contentConfig} />
        </div>
    );
}
