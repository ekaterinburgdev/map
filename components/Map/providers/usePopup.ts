import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AboutProjectContext } from 'state/providers/AboutProjectProvider';
import { MapItemType } from 'types/map-item';

type PopupId = string;

export function usePopup() {
    const { close: closeAboutProject } = useContext(AboutProjectContext);

    const [popupId, setOpenedPopup] = useState<PopupId>(null);
    const [popupType, setPopupType] = useState<MapItemType>(null);

    const router = useRouter();

    const openPopup = useCallback(
        (id: PopupId, type: MapItemType) => {
            closeAboutProject();
            router.push({
                pathname: router.pathname,
                query: { ...router.query, type, id },
            });
        },
        [closeAboutProject, router],
    );

    const closePopup = useCallback(() => {
        setPopupType(null);
        setOpenedPopup(null);

        router.push({
            pathname: router.pathname,
            query: {},
        });
    }, [router]);

    const handleOpenPopup = useCallback(() => {
        const { type, id } = router.query;

        setOpenedPopup((id as PopupId).replace('_', '-'));
        setPopupType(type as MapItemType);
    }, [router.query]);

    useEffect(() => {
        window.addEventListener('popstate', handleOpenPopup, false);

        return () => {
            window.removeEventListener('popstate', handleOpenPopup, false);
        };
    }, [handleOpenPopup]);

    useEffect(() => {
        const { type, id } = router.query;

        if (!type && !id) {
            return;
        }

        handleOpenPopup();
    }, [handleOpenPopup, router.query]);

    return {
        popupId,
        popupType,
        openPopup,
        closePopup,
    };
}
