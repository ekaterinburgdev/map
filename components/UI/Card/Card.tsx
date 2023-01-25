import React, { useContext, useMemo } from 'react';
import { Modal } from 'components/UI/Modal';
import { checkIsMobile } from 'common/isMobile';
import { MapItemType } from 'common/types/map-item';
import { OKNCardContent } from 'components/Model/OKN/CardContent';
import { HousesCardContent } from 'components/Model/Houses/CardContent/CardContent';
import { MapContext } from '../Map/providers/MapProvider';

export const CONTENT_BY_TYPE = {
    [MapItemType.OKN]: OKNCardContent,
    [MapItemType.Houses]: HousesCardContent,
};

export function Card() {
    const { popup, closePopup } = useContext(MapContext);

    const size = useMemo(() => {
        const mobileSize = popup?.images?.length ? 0.85 : 0.5;
        const desktopSize = 100;

        return checkIsMobile() ? mobileSize : desktopSize;
    }, [popup?.images?.length]);

    const CardContent = useMemo(() => CONTENT_BY_TYPE[popup?.type], [popup?.type]);

    return (
        <Modal size={size} isOpen={!!popup} close={closePopup}>
            <CardContent placemark={popup} />
        </Modal>
    );
}
