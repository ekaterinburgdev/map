import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from 'state/features/dataLayers';

import { okn } from 'components/Layers/OKN/okn';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';
import { Section } from 'components/UI/Card/components/Section/Section';
import { FilterType } from 'types/Filters.types';
import { activeFilterParamsSelector, activeFilterSelector } from 'state/features/selectors';

import { AREA_CONFIG, OBJECTS_CONFIG } from '../../Okn.constants';
import { OknObjectSignificanceType, OknAreaType } from '../../oknConstants';
import {
    areaInitalState,
    areaReducer,
    objectsInitalState,
    objectsReducer,
} from './OknFilter.state';
import styles from './OknFilter.module.css';

type ObjectsCountEntries = [OknObjectSignificanceType, number][];

export function OknFilter() {
    const dispatch = useDispatch();
    const activeFilter = useSelector(activeFilterSelector);
    const activeFilterParams = useSelector(activeFilterParamsSelector);
    const [areaState, dispatchArea] = useReducer(areaReducer, areaInitalState);
    const [objectsState, dispatchObjects] = useReducer(objectsReducer, objectsInitalState);
    const [objectsCount, setObjectsCount] = useState<ObjectsCountEntries>(null);
    const [areaCount, setAreaCount] = useState<[OknAreaType, number][]>(null);

    useEffect(() => {
        okn.getObjectsCount().then((objectsCountResult: ObjectsCountEntries) => {
            const sortedObjectsCount = objectsCountResult.sort(
                ([, countA], [, countB]) => countB - countA,
            );

            setObjectsCount(sortedObjectsCount);
        });
    }, []);

    useEffect(() => {
        okn.getZonesCount().then((areaCountResult: [OknAreaType, number][]) => {
            const sortedObjectsCount = areaCountResult.sort(
                ([, countA], [, countB]) => countB - countA,
            );

            setAreaCount(sortedObjectsCount);
        });
    }, []);

    const onAreaChange = useCallback(
        (oknArea: OknAreaType) => async () => {
            dispatchArea({ type: 'toggle', areaType: oknArea });
        },
        [],
    );

    const onObjectsChange = useCallback(
        (oknObjectType: OknObjectSignificanceType) => async () => {
            dispatchObjects({ type: 'toggle', objectsType: oknObjectType });
        },
        [],
    );

    useEffect(() => {
        dispatch(
            setFilter({
                activeFilter: FilterType.OKN,
                activeFilterParams: {
                    ...Object.entries(areaState).reduce(
                        (all, [id, value]) => ({ ...all, [id]: { value, type: 'area' } }),
                        {},
                    ),
                    ...Object.entries(objectsState).reduce(
                        (all, [id, value]) => ({ ...all, [id]: { value, type: 'objects' } }),
                        {},
                    ),
                },
            }),
        );
    }, [dispatch, areaState, objectsState]);

    if (activeFilter !== FilterType.OKN && !activeFilterParams.filter) {
        return null;
    }

    if (!(objectsCount && areaCount)) {
        return <FilterLoader />;
    }

    return (
        <>
            {objectsCount?.map(([type, count], i) => (
                <Checkbox
                    id={`okn-${i}`}
                    checked={objectsState[type]}
                    color={OBJECTS_CONFIG[type].color}
                    onClick={onObjectsChange(type)}
                    mix={styles.OknFilter__checkboxContent}
                    key={`filter-okn-${type}`}
                >
                    {type}
                    <span className={styles.OknFilter__objectsCount}>{count}</span>
                </Checkbox>
            ))}
            <Section>
                {areaCount?.map(([type, count], i) => (
                    <Checkbox
                        id={`okn-zones-${i}`}
                        checked={areaState[type]}
                        color={AREA_CONFIG[type].color}
                        onClick={onAreaChange(type)}
                        mix={styles.OknFilter__checkboxContent}
                        key={`filter-okn-zone-${type}`}
                    >
                        {type}
                        <span className={styles.OknFilter__objectsCount}>{count}</span>
                        <br />
                        <small className={styles.OknFilter__checkboxDescription}>
                            {AREA_CONFIG[type].description}
                        </small>
                    </Checkbox>
                ))}
            </Section>
        </>
    );
}
