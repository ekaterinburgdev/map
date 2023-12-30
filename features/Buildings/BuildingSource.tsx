import {
    ColorSpecification,
    DataDrivenPropertyValueSpecification,
    ExpressionSpecification,
} from 'maplibre-gl';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import {
    AGE_FILTERS_DATA,
    FLOOR_FILTERS_DATA,
    WEAR_TEAR_FILTERS_DATA,
} from 'features/Buildings/Houses.constants';
import { colorLuminance } from 'features/Map/helpers/colorLuminance';
import { getLayerStyle } from 'features/Map/helpers/getFeatureState';
import useMapObjectState from 'features/Map/helpers/useMapObjectState';
import { usePopup } from 'features/Map/providers/usePopup';
import { activeFilterParamsSelector } from 'state/features/selectors';
import { MapItemType } from 'types/Content.types';
import { FilterType } from 'types/Filters.types';

const BUILDING_LAYER_ID = 'building';

const DEFAULT_BULDING_COLOR_NORMAL = '#0c1021';

interface SetBuildingStyleProps {
    map: mapboxgl.Map;
    color: DataDrivenPropertyValueSpecification<ColorSpecification | ExpressionSpecification>;
    caseCondition?: (string | string[])[];
    layerProps?: Record<string, any>;
}

export function setBuildingColor({
    map,
    color,
    caseCondition = ['has', '_unknown_'],
    layerProps,
}: SetBuildingStyleProps) {
    map.setStyle({
        ...map?.getStyle(),
        layers: map?.getStyle().layers.map((layer: any) => {
            if (layer.id === BUILDING_LAYER_ID) {
                return {
                    ...layer,
                    ...layerProps,
                    paint: {
                        ...layer.paint,
                        'fill-extrusion-color': [
                            'case',
                            caseCondition,
                            color,
                            DEFAULT_BULDING_COLOR_NORMAL,
                        ],
                        ...layerProps?.paint,
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
        setBuildingColor({ map, color: DEFAULT_BULDING_COLOR_NORMAL });
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

    setBuildingColor({
        map,
        color: getLayerStyle<ExpressionSpecification>({
            initial: getColor(colorsInitial),
            hover: getColor(colorsHover),
            active: getColor(colorsActive),
        }),
        caseCondition: ['has', field],
    });
}

const ageRangeData = AGE_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));
const levelsRangeData = FLOOR_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));
const healthRangeData = WEAR_TEAR_FILTERS_DATA.map((item) => ({ ...item, value: 1 }));

export function BuildingSource() {
    const ekbMap = useMap();
    const router = useRouter();
    const activeFilter = (router.query.filter as FilterType) || FilterType.HouseAge;
    const activeFilterParams = useSelector(activeFilterParamsSelector);
    const { openPopup } = usePopup();

    useEffect(() => {
        const map = ekbMap?.current?.getMap?.();

        const field = {
            [FilterType.HouseAge]: 'building:year',
            [FilterType.HouseFloor]: 'building:levels',
            [FilterType.HouseWearTear]: 'building:health',
            [FilterType.HouseFacades]: 'building:facade',
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
