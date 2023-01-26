import React, {
    useContext, useEffect, useMemo, useState,
} from 'react';

import { Modal } from 'components/UI/Modal';
import { checkIsMobile } from 'common/isMobile';
import { MapItemType } from 'common/types/map-item';
import { OKNCardContent } from 'components/Model/OKN/CardContent';
import { HousesCardContent } from 'components/Model/Houses/CardContent/CardContent';
import { DTPCardContent } from 'components/Model/DTP/CardContent/CardContent';

import { dtp } from 'common/data/dtp/dtp';
import { okn } from 'common/data/okn/okn';
import { houseBase } from 'common/data/base/houseBase';

import { MapContext } from '../Map/providers/MapProvider';

export const CONTENT_BY_TYPE = {
    [MapItemType.OKN]: OKNCardContent,
    [MapItemType.Houses]: HousesCardContent,
    [MapItemType.DTP]: DTPCardContent,
};

export const REQUEST_BY_TYPE = {
    [MapItemType.OKN]: okn.getObject,
    [MapItemType.Houses]: houseBase.getObject,
    [MapItemType.DTP]: dtp.getObject,
};

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

    const CardContent = useMemo(() => CONTENT_BY_TYPE[popupType], [popupType]);

    return (
        <Modal size={size} isOpen={!!popupId} close={closePopup}>
            {loading ? <p>Загрузка...</p> : <CardContent placemark={popupData} />}
        </Modal>
    );
}
