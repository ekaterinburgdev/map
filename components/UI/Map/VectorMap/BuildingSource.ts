import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { activeFilterParamsSelector, activeFilterSelector } from 'state/features/selectors';
import { AGE_FILTERS_DATA, FLOOR_FILTERS_DATA } from 'components/Model/Houses/Houses.constants';
import { FilterType } from 'components/UI/Filters/Filters.types';

export function setBuildingStyle({ map, range, field, rangeData }) {
    if (!(range?.min && range?.max && field && rangeData)) {
        map.setStyle({
            ...map.getStyle(),
            layers: map.getStyle().layers.map((layer) => {
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
                    return {
                        ...layer,
                        paint: {
                            ...layer.paint,
                            'fill-extrusion-color': [
                                'interpolate',
                                ['linear'],
                                ['to-number', ['get', field]],
                                0,
                                '#0c1021',
                            ].concat(colors),
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

export function BuildingSource() {
    const ekbMap = useMap();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);

    useEffect(() => {
        const map = ekbMap?.current?.getMap?.();

        const field = {
            [FilterType.HouseAge]: 'building:year',
            [FilterType.HouseFloor]: 'building:height',
        }[activeFilter];

        const rangeData = {
            [FilterType.HouseAge]: ageRangeData,
            [FilterType.HouseFloor]: levelsRangeData,
        }[activeFilter];

        setBuildingStyle({
            map,
            field,
            rangeData,
            range: activeFilterParams,
        });
    }, [activeFilter, activeFilterParams, ekbMap]);

    return null;
}
