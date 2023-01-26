/* eslint-disable */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapItemType } from 'common/types/map-item';

type PopupId = string;

export function usePopup() {
    const [popupId, setOpenedPopup] = useState<PopupId>(null);
    const [popupType, setPopupType] = useState<MapItemType>(null);

    const openPopup = useCallback((id: PopupId, type: MapItemType) => {
        window.location.hash = `${type}-${id}`;
    }, []);

    const closePopup = useCallback(() => {
        window.location.hash = '';
    }, []);

    const handleOpenPopup = useCallback(() => {
        const [type, id] = window.location.hash.slice(1).split('-');

        setOpenedPopup(id);
        setPopupType(type as MapItemType);
    }, []);

    useEffect(() => {
        window.addEventListener('hashchange', handleOpenPopup, false);

        return () => {
            window.removeEventListener('hashchange', handleOpenPopup, false);
        };
    }, [setOpenedPopup]);

    useEffect(() => {
        if (!window.location.hash) {
            return;
        }

        handleOpenPopup();
    }, []);

    return {
        popupId,
        popupType,
        openPopup,
        closePopup,
    };
}
