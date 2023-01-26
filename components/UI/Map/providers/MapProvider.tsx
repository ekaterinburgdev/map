/* eslint-disable */

import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { uniqBy } from 'lodash';
import { MapItemType } from 'common/types/map-item';
import { usePopup } from './usePopup';

export interface IMapContext {
    filterMarks: (items: MapItemType[]) => void;
    popupId: string | null;
    popupType: MapItemType | null;
    openPopup: (p: string, t: MapItemType) => void;
    closePopup: VoidFunction;
}

export const MapContext = React.createContext<IMapContext>({
    filterMarks: () => {},
    popupId: null,
    popupType: null,
    openPopup: () => {},
    closePopup: () => {},
});

interface Props {
    children: ReactNode;
}

export function MapContextProvider({ children }: Props) {
    const [selectedMarksTypes, setSelectedMarks] = useState<MapItemType[]>([]);
    const { popupId, popupType, openPopup, closePopup } = usePopup();

    const filterMarks = useCallback(
        (items: MapItemType[]) => setSelectedMarks(items),
        [setSelectedMarks],
    );

    const value = useMemo(
        () => ({
            selectedMarksTypes,
            filterMarks,
            popupId,
            popupType,
            openPopup,
            closePopup,
        }),
        [selectedMarksTypes, filterMarks, popupId, popupType, openPopup, closePopup],
    );

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
