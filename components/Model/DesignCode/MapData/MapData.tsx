import React, { useContext, useMemo } from 'react';

import { DESIGN_MAP_HOST } from 'common/data/designCode/designCode';
import { MapItemType } from 'common/types/map-item';
import { Point } from 'components/UI/Map/Point';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

import { DESIGN_CODE_MARKER_COLOR_BY_TYPE } from './MapData.constants';

import { DesignCodeMapDataProps } from './MapData.types';

export function DesignCodeMapData({ id, coords, type, preview }: DesignCodeMapDataProps) {
    const { openPopup, closePopup, popupId, popupType } = useContext(MapContext);
    const isOpen = useMemo(
        () => id === popupId && popupType === MapItemType.DesignCode,
        [id, popupId, popupType],
    );
    const previewUrl = useMemo(() => {
        const previewSrcPath = preview?.s?.src;
        if (!previewSrcPath) {
            return null;
        }

        return `${DESIGN_MAP_HOST}/${previewSrcPath}`;
    }, [preview]);

    return (
        <Point
            key={MapItemType.DesignCode + id}
            id={id}
            type={MapItemType.DesignCode}
            color={DESIGN_CODE_MARKER_COLOR_BY_TYPE[type]}
            position={coords}
            preview={previewUrl}
            isOpen={isOpen}
            openPopup={openPopup}
            closePopup={closePopup}
        />
    );
}
