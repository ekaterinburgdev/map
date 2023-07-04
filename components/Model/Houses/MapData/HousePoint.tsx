import React from 'react';
import { HouseClient } from 'common/data/base/houseBase';
import { Point, Sizes } from 'components/UI/Map/Point';
import { MapItemType } from 'common/types/map-item';

export function HousePoint(houseClient: HouseClient) {
    const { geometry, id } = houseClient;

    return (
        <Point
            position={geometry}
            id={id}
            type={MapItemType.Houses}
            color={'white'}
            size={Sizes.XS}
            openPopup={() => {}}
            closePopup={() => {}}
        />
    );
}
