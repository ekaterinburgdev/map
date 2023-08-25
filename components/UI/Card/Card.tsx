import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CardLoader } from 'components/UI/Card/components/Loader/Loader';
import { MODEL_CONFIG } from 'components/Layers/config';
import { MapContext } from 'components/Map/providers/MapProvider';

export function Card() {
    const { popupId, popupType } = useContext(MapContext);
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

    const CardContent = useMemo(() => {
        setLoading(true);

        return MODEL_CONFIG[popupType]?.cardContent || (() => null);
    }, [popupType]);

    return loading ? <CardLoader /> : <CardContent placemark={popupData} />;
}
