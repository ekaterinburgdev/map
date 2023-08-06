import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { AGE_FILTERS_DATA, FLOOR_FILTERS_DATA, WEAR_TEAR_FILTERS_DATA } from 'components/Model/Houses/Houses.constants';
import { activeFilterParamsSelector, activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { MapItemType } from 'common/types/map-item';
import { usePopup } from '../providers/usePopup';
import useMapHoverObject from '../providers/useMapHoverObject';

export function setBuildingStyle({ map, range, field, rangeData }) {
    if (
        !(
            typeof range?.min === 'number' &&
            typeof range?.max === 'number' &&
            field &&
            rangeData &&
            map?.setStyle &&
            map?.getStyle
        )
    ) {
        map.setStyle({
            ...map?.getStyle(),
            layers: map?.getStyle().layers.map((layer) => {
                if (layer.id === 'building') {
                    return {
                        ...layer,
                        paint: {
                            ...layer.paint,
                            'fill-extrusion-color': '#0c1021',
                        },
                    };
                }
                return layer;
            }),
        });
        return;
    }

    if (map?.getStyle) {
        const colors = rangeData
            .map((item) => {
                if (item.from >= range.min && item.to <= range.max) {
                    return item;
                }
                return { ...item, color: '#0c1021' };
            })
            .map((item) => [item.from, item.color])
            .flat(2);

        const newStyle = {
            ...map.getStyle(),
            layers: map.getStyle().layers.map((layer) => {
                if (layer.id === 'building') {
                    const values = ['interpolate', ['linear'], ['to-number', ['get', field]]];

                    if (rangeData[0]?.from > 0) {
                        // @ts-ignore
                        values.push(0);
                        values.push('#0c1021');
                    }
                    return {
                        ...layer,
                        paint: {
                            ...layer.paint,
                            'fill-extrusion-color': [
                                'case',
                                ['boolean', ['feature-state', 'active'], false],
                                '#f23c34',
                                ['interpolate', ['linear'], ['to-number', ['get', field]], ...colors],
                            ],
                        },
                    };
                }
                return layer;
            }),
        };

        map.setStyle(newStyle);
    }
}

const ageRangeData = AGE_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));
const levelsRangeData = FLOOR_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));
const healthRangeData = WEAR_TEAR_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));

export function BuildingSource() {
    const ekbMap = useMap();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);
    const { openPopup } = usePopup();

    useEffect(() => {
        const map = ekbMap?.current?.getMap?.();

        const field = {
            [FilterType.HouseAge]: 'building:year',
            [FilterType.HouseFloor]: 'building:levels',
            [FilterType.HouseWearTear]: 'building:health',
        }[activeFilter];

        const rangeData = {
            [FilterType.HouseAge]: ageRangeData,
            [FilterType.HouseFloor]: levelsRangeData,
            [FilterType.HouseWearTear]: healthRangeData,
        }[activeFilter];

        setBuildingStyle({
            map,
            field,
            rangeData,
            range: activeFilterParams,
        });
    }, [activeFilter, activeFilterParams, ekbMap]);

    useMapHoverObject('building');

    useEffect(() => {
        const map = ekbMap?.current?.getMap?.();

        if (!map) return;

        map.on('click', 'building', (e) => {
            openPopup(`${e.lngLat.lat}_${e.lngLat.lng}`, MapItemType.Houses);
        });
    }, [ekbMap, openPopup]);

    return null;
}
