import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ContentConfig, MapItemType } from 'types/Content.types';
import { Loader } from 'shared/UI/Loader/Loader';

interface Props {
    contentConfig: ContentConfig;
    popupId?: string;
    popupType: MapItemType | null;
}

const CardLoaderContainer = styled.div`
    position: relative;
    height: 600px;
`;

export function Card({ contentConfig, popupId, popupType }: Props) {
    const [popupData, setPopupData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            if (!popupId || !popupType) {
                return;
            }

            setLoading(true);

            const requestFunction = contentConfig[popupType].oneItemRequest;

            const data = await requestFunction(popupId);

            setPopupData(data);
            setLoading(false);
        }

        fetchData();
    }, [contentConfig, popupId, popupType]);

    const CardContent = useMemo(() => {
        setLoading(true);

        return contentConfig[popupType]?.cardContent || (() => null);
    }, [contentConfig, popupType]);

    return loading ? (
        <CardLoaderContainer>
            <Loader radius={180} />
        </CardLoaderContainer>
    ) : (
        <CardContent placemark={popupData} />
    );
}
