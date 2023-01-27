/* eslint-disable */

import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { uniqBy } from 'lodash';
import { MapItemType } from 'common/types/map-item';
import { usePopup } from './usePopup';

export interface IMapContext {
    popupId: string | null;
    popupType: MapItemType | null;
    openPopup: (p: string, t: MapItemType) => void;
    closePopup: VoidFunction;
}

export const MapContext = React.createContext<IMapContext>({
    popupId: null,
    popupType: null,
    openPopup: () => {},
    closePopup: () => {},
});

interface Props {
    children: ReactNode;
}

export function MapContextProvider({ children }: Props) {
    const { popupId, popupType, openPopup, closePopup } = usePopup();

    const value = useMemo(
        () => ({
            popupId,
            popupType,
            openPopup,
            closePopup,
        }),
        [popupId, popupType, openPopup, closePopup],
    );

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
