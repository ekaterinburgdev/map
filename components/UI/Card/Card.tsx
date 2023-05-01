import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Modal } from 'components/UI/Modal';
import { checkIsMobile } from 'common/isMobile';
import { MODEL_CONFIG } from 'components/Model/config';

import { MapContext } from '../Map/providers/MapProvider';

import styles from './Card.module.css';

export function Card() {
    const { popupId, popupType, closePopup } = useContext(MapContext);
    const [popupData, setPopupData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            if (!popupId || !popupType) {
                return;
            }

            setLoading(true);

            const requestFunction = MODEL_CONFIG[popupType].requests.oneItemRequest;

            const data = await requestFunction(popupId);

            setPopupData(data);
            setLoading(false);
        }

        fetchData();
    }, [popupId, popupType]);

    const size = useMemo(() => {
        const mobileSize = popupData?.images?.length ? 0.85 : 0.5;
        const desktopSize = 100;

        return checkIsMobile() ? mobileSize : desktopSize;
    }, [popupData?.images?.length]);

    const CardContent = useMemo(() => {
        setLoading(true);

        return MODEL_CONFIG[popupType]?.cardContent || (() => null);
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
