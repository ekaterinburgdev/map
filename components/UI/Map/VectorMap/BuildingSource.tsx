import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { ExpressionSpecification } from 'maplibre-gl';
import {
    AGE_FILTERS_DATA,
    FLOOR_FILTERS_DATA,
    WEAR_TEAR_FILTERS_DATA,
} from 'components/Model/Houses/Houses.constants';
import { activeFilterParamsSelector, activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { MapItemType } from 'common/types/map-item';
import { colorLuminance } from 'components/helpers/colorLuminance';
import { getLayerStyle } from 'components/helpers/getLayerStyle';
import { usePopup } from '../providers/usePopup';
import useMapObjectState from '../providers/useMapObjectState';

const BUILDING_LAYER_ID = 'building';

const DEFAULT_BULDING_COLOR_NORMAL = '#0c1021';

function setBuildingColor(map, field, color) {
    map.setStyle({
        ...map?.getStyle(),
        layers: map?.getStyle().layers.map((layer) => {
            if (layer.id === BUILDING_LAYER_ID) {
                return {
                    ...layer,
                    paint: {
                        ...layer.paint,
                        'fill-extrusion-color': [
                            'case',
                            ['has', field],
                            color,
                            DEFAULT_BULDING_COLOR_NORMAL,
                        ],
                    },
                };
            }
            return layer;
        }),
    });
}

function setBuildingStyle({ map, range, field, rangeData }) {
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
        setBuildingColor(map, field, DEFAULT_BULDING_COLOR_NORMAL);
        return;
    }

    const colorsInitial = rangeData
        .map((item) => {
            if (item.from >= range.min && item.to <= range.max) {
                return item;
            }
            return { ...item, color: DEFAULT_BULDING_COLOR_NORMAL };
        })
        .map((item) => [item.from, item.color]);

    const colorsHover = colorsInitial.map(([from, color]) => [from, colorLuminance(color, 0.4)]);

    const colorsActive = colorsInitial.map(([from, color]) => [from, colorLuminance(color, 0.55)]);

    const getColor = (style: [number, number][]): ExpressionSpecification => [
        'interpolate',
        ['linear'],
        ['to-number', ['get', field]],
        ...style.flat(2),
    ];

    setBuildingColor(
        map,
        field,
        getLayerStyle<ExpressionSpecification>({
            initial: getColor(colorsInitial),
            hover: getColor(colorsHover),
            active: getColor(colorsActive),
        }),
    );
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

    useMapObjectState('building');

    useEffect(() => {
        const map = ekbMap?.current?.getMap?.();

        if (!map) return;

        map.on('click', 'building', (e) => {
            openPopup(`${e.lngLat.lat}_${e.lngLat.lng}`, MapItemType.Houses);
        });
    }, [ekbMap, openPopup]);

    return null;
}
