import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setData } from 'state/features/dataLayers';

import { OknAreaType, OknObjectSignificanceType } from 'common/data/okn/oknConstants';
import { okn } from 'common/data/okn/okn';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';

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

type ObjectsCount = Record<OknObjectSignificanceType, number>;

export function OknFilter() {
    const dispatch = useDispatch();
    const [areaState, dispatchArea] = useReducer(areaReducer, areaInitalState);
    const [objectsState, dispatchObjects] = useReducer(objectsReducer, objectsInitalState);
    const [objectsCount, setObjectsCount] = useState<ObjectsCount>(null);
    const [areaCount, setAreaCount] = useState<Record<OknAreaType, number>>(null);

    useEffect(() => {
        okn.getObjectsCount().then(setObjectsCount);
    }, []);

    useEffect(() => {
        okn.getZonesCount().then(setAreaCount);
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

    return (
        <div>
            {OBJECTS_CONFIG.map(({ color, label }, i) => (
                <>
                    <Checkbox
                        id={`okn-${i}`}
                        checked={objectsState[label]}
                        color={color}
                        onClick={onObjectsChange(label)}
                    >
                        {label}
                        <span className={styles.OknFilter__objectsCount}>
                            {objectsCount?.[label]}
                        </span>
                    </Checkbox>
                    <div className={styles.OknFilter__checkboxContent} />
                </>
            ))}
            <Section>
                {AREA_CONFIG.map(({ color, label, description }, i) => (
                    <>
                        <Checkbox
                            id={`okn-zones-${i}`}
                            checked={areaState[label]}
                            color={color}
                            onClick={onAreaChange(label)}
                        >
                            {label}
                            <span className={styles.OknFilter__objectsCount}>
                                {areaCount?.[label]}
                            </span>
                            <br />
                            <small className={styles.OknFilter__checkboxDescription}>
                                {description}
                            </small>
                        </Checkbox>
                        <div className={styles.OknFilter__checkboxContent} />
                    </>
                ))}
            </Section>
        </div>
    );
}
