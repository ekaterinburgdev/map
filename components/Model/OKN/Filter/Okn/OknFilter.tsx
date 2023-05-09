import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setData } from 'state/features/dataLayers';

import { OknAreaType, OknObjectSignificanceType } from 'common/data/okn/oknConstants';
import { okn } from 'common/data/okn/okn';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';
import { Section } from 'components/UI/Card/components/Section/Section';
import { FilterType } from 'components/UI/Filters/Filters.types';

import { OBJECTS_CONFIG, AREA_CONFIG } from '../../Okn.constants';

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
            if (!areaState[oknArea]) {
                const oknAreas = await okn.getAreaByType(oknArea);

                dispatch(
                    setData({
                        type: oknArea,
                        data: oknAreas,
                    }),
                );
            } else {
                dispatch(
                    setData({
                        type: oknArea,
                        data: [],
                    }),
                );
            }

            dispatchArea({ type: 'toggle', areaType: oknArea });
        },
        [dispatch, areaState],
    );

    const onObjectsChange = useCallback(
        (oknObjectType: OknObjectSignificanceType) => async () => {
            dispatchObjects({ type: 'toggle', objectsType: oknObjectType });
        },
        [],
    );

    useEffect(() => {
        const oknTypes = Object.entries(objectsState).reduce((acc, [type, value]) => {
            if (value) {
                acc.push(type);
            }

            return acc;
        }, []);

        if (!oknTypes.length) {
            dispatch(
                setData({
                    type: FilterType.OKN,
                    data: [],
                }),
            );

            return;
        }

        okn.getObjectsBySignificanceType(oknTypes).then((objects) => {
            dispatch(
                setData({
                    type: FilterType.OKN,
                    data: objects,
                }),
            );
        });
    }, [dispatch, objectsState]);

    return objectsCount && areaCount ? (
        <>
            {objectsCount
                && objectsCount.map(([type, count], i) => (
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
                {areaCount
                    && areaCount.map(([type, count], i) => (
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
    ) : (
        <FilterLoader />
    );
}
