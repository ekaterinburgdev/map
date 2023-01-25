/* eslint-disable */

import React, { useContext, useMemo } from 'react';
import { Modal } from 'components/UI/Modal';
import { checkIsMobile } from 'common/isMobile';
import { MapContext } from '../Map/providers/MapProvider';
import { CardContent } from './CardContent';

export function Card() {
    const { popup, closePopup } = useContext(MapContext);
    
    // console.log(closePopup)

    const size = useMemo(() => {
        const mobileSize = popup?.images?.length ? 0.85 : 0.50;
        const desktopSize = 100;

        return checkIsMobile() ? mobileSize : desktopSize;
    }, [popup?.images?.length]);

    return (
        <Modal size={size} isOpen={!!popup} close={closePopup}>
            <CardContent placemark={popup} />
        </Modal>
    );
}
