import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Modal } from 'components/UI/Modal';
import { checkIsMobile } from 'common/isMobile';

import { MapContext } from '../Map/providers/MapProvider';

import { REQUEST_BY_TYPE, CONTENT_BY_TYPE } from './Card.constants';

import styles from './Card.module.css';

export function Card() {
    const { popupId, popupType, closePopup } = useContext(MapContext);
    const [popupData, setPopupData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!popupId || !popupType) {
            return;
        }

        setLoading(true);

        REQUEST_BY_TYPE[popupType](popupId).then((data: any) => {
            setPopupData(data);
            setLoading(false);
        });
    }, [popupId, popupType]);

    const size = useMemo(() => {
        const mobileSize = popupData?.images?.length ? 0.85 : 0.5;
        const desktopSize = 100;

        return checkIsMobile() ? mobileSize : desktopSize;
    }, [popupData?.images?.length]);

    const CardContent = useMemo(() => {
        setLoading(true);

        return CONTENT_BY_TYPE[popupType];
    }, [popupType]);

    return (
        <Modal size={size} isOpen={!!popupId} close={closePopup}>
            {loading ? (
                <p className={styles.card__loader}>Загрузка...</p>
            ) : (
                <CardContent placemark={popupData} />
            )}
        </Modal>
    );
}
