/* eslint-disable */

import React, { ReactNode, useMemo, useState } from 'react';
import { MapItemType } from 'common/types/map-item';
import { usePopup } from './usePopup';

export interface IMapContext {
    popupId: string | null;
    popupType: MapItemType | null;
    openPopup: (p: string, t: MapItemType) => void;
    closePopup: VoidFunction;
    loading: boolean;
    setLoading: (l: boolean) => void;
}

export const MapContext = React.createContext<IMapContext>({
    popupId: null,
    popupType: null,
    openPopup: () => {},
    closePopup: () => {},
    loading: true,
    setLoading: () => {},
});

interface Props {
    children: ReactNode;
}

export function MapContextProvider({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const { popupId, popupType, openPopup, closePopup } = usePopup();

    const value = useMemo(
        () => ({
            popupId,
            popupType,
            openPopup,
            closePopup,
            loading,
            setLoading,
        }),
        [popupId, popupType, openPopup, closePopup, loading, setLoading],
    );

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
