/* eslint-disable */

import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { uniqBy } from 'lodash';
import { MapItem, MapItemType } from 'common/types/map-item';
import { usePopup } from './usePopup';

type PopupId = MapItem['id'];
export interface IMapContext {
    placemarks: MapItem[];
    savePlacemarks: (marks: MapItem[]) => void;
    allMarksTypes: MapItemType[];
    selectedMarksTypes: MapItemType[];
    filterMarks: (items: MapItemType[]) => void;
    popup: MapItem | null;
    openPopup: (p: PopupId, t: MapItemType) => void;
    closePopup: VoidFunction;
}

export const MapContext = React.createContext<IMapContext>({
    placemarks: [],
    savePlacemarks: () => {},
    allMarksTypes: [],
    selectedMarksTypes: [],
    filterMarks: () => {},
    popup: null,
    openPopup: () => {},
    closePopup: () => {},
});

interface Props {
    children: ReactNode;
}

const getUniqTypes = (all: MapItem[]) => uniqBy(all, (mark) => mark.type).map((m) => m.type);

export function MapContextProvider({ children }: Props) {
    const [placemarks, setMarks] = useState<MapItem[]>([]);
    const [selectedMarksTypes, setSelectedMarks] = useState<MapItemType[]>([]);
    const { popup, openPopup, closePopup } = usePopup(placemarks);

    const filterMarks = useCallback(
        (items: MapItemType[]) => setSelectedMarks(items),
        [setSelectedMarks],
    );

    const savePlacemarks = useCallback(
        (items: MapItem[]) => {
            setMarks(items);
            setSelectedMarks(getUniqTypes(items));
        },
        [setMarks],
    );

    const allMarksTypes = useMemo(() => getUniqTypes(placemarks), [placemarks]);

    const value = useMemo(
        () => ({
            placemarks,
            savePlacemarks,
            allMarksTypes,
            selectedMarksTypes,
            filterMarks,
            popup,
            openPopup,
            closePopup,
        }),
        [
            placemarks,
            savePlacemarks,
            allMarksTypes,
            selectedMarksTypes,
            filterMarks,
            popup,
            openPopup,
            closePopup,
        ],
    );

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
