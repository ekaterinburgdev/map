/* eslint-disable */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapItem, MapItemType } from 'common/types/map-item';

type PopupId = MapItem['id'];

export function usePopup(placemarks: MapItem[]) {
    const [popupId, setOpenedPopup] = useState<PopupId>(null);
    const [popupType, setPopupType] = useState<MapItemType>(null);

    const openPopup = useCallback((id: PopupId, type: MapItemType) => {
        window.location.hash = `${type}-${id}`;
    }, []);

    const closePopup = useCallback(() => {
        window.location.hash = '';
    }, []);

    const popup = useMemo(
        () => placemarks.find((p) => p.id === popupId && p.type === popupType),
        [placemarks, popupId, popupType],
    );

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
        document.title = popup?.name || 'Карта дизайн-кода Екатеринбурга';
    }, [popup]);

    useEffect(() => {
        if (!placemarks.length || !window.location.hash) {
            return;
        }

        handleOpenPopup();
    }, [placemarks?.length]);

    return {
        popup,
        openPopup,
        closePopup,
    };
}
