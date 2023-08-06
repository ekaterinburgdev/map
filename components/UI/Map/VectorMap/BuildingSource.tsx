import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { ExpressionSpecification } from 'maplibre-gl';
import { AGE_FILTERS_DATA, FLOOR_FILTERS_DATA, WEAR_TEAR_FILTERS_DATA } from 'components/Model/Houses/Houses.constants';
import { activeFilterParamsSelector, activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { MapItemType } from 'common/types/map-item';
import { colorLuminance } from 'components/helpers/colorLuminance';
import { getLayerStyle } from 'components/helpers/getLayerStyle';
import { usePopup } from '../providers/usePopup';
import useMapHoverObject from '../providers/useMapHoverObject';

const DEFAULT_BULDING_COLOR_NORMAL = '#0c1021';
const DEFAULT_BULDING_COLOR_ACTIVE = '#96a4bd';

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
                            'fill-extrusion-color': getLayerStyle<string>({
                                initial: DEFAULT_BULDING_COLOR_NORMAL,
                                active: DEFAULT_BULDING_COLOR_ACTIVE,
                            }),
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
                return { ...item, color: DEFAULT_BULDING_COLOR_NORMAL };
            })
            .map((item) => [item.from, item.color]);

        const colorsNormal = colors
            .flat(2);

        const colorsActive = colors
            .map(([from, color]) => [from, colorLuminance(color, 0.4)])
            .flat(2);

        const newStyle = {
            ...map.getStyle(),
            layers: map.getStyle().layers.map((layer) => {
                if (layer.id === 'building') {
                    const values = ['interpolate', ['linear'], ['to-number', ['get', field]]];

                    if (rangeData[0]?.from > 0) {
                        // @ts-ignore
                        values.push(0);
                        values.push(DEFAULT_BULDING_COLOR_NORMAL);
                    }

                    return {
                        ...layer,
                        paint: {
                            ...layer.paint,
                            'fill-extrusion-color': getLayerStyle<ExpressionSpecification>({
                                initial: ['interpolate', ['linear'], ['to-number', ['get', field]], ...colorsNormal],
                                active: ['interpolate', ['linear'], ['to-number', ['get', field]], ...colorsActive],
                            }),
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
