/* eslint-disable */
import React, {useContext, useMemo, useState} from 'react';
import classNames from 'classnames';
import {groupBy} from 'lodash';

import {MARKER_FILTER_COLOR} from 'common/constants/colors';
import {MapItem, MapItemType} from 'common/types/map-item';
import {MapContext} from 'components/UI/Map/providers/MapProvider';

import styles from './Filter.module.css';
import {FilterItem} from './FilterItem';

interface Props {
    showHeading: boolean;
}

export function Filter({ showHeading = true }: Props) {
    const [isOpen, setOpen] = useState(false);
    const { placemarks, allMarksTypes, selectedMarksTypes } = useContext(MapContext);

    const itemsByType = useMemo(
        () => groupBy<MapItem>(placemarks, (mark) => mark.type),
        [placemarks],
    );

    const filters = useMemo(
        () => allMarksTypes.map((type) => ({
            name: MapItemType[type],
            count: itemsByType[type].length,
            checked: selectedMarksTypes.includes(type),
            color: MARKER_FILTER_COLOR[MapItemType[type]],
        })).sort((a, b) => b.count - a.count),
        [allMarksTypes, selectedMarksTypes, itemsByType],
    );

    const count = useMemo(() => filters.reduce((all, item) => all + item.count, 0), [filters]);

    const toggle = () => setOpen(!isOpen);

    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
            toggle();
        }
    };
    return (
        <div className={styles.filter}>
            <div
                className={styles.filter__control}
                tabIndex={0}
                role="button"
                onClick={toggle}
                onKeyUp={onKeyUp}
            >
                <div>
                    {showHeading
                    && <h1 className={styles.filter__header}>Карта объектов дизайн-кода</h1>}
                    <div className={styles.filter__counter}>
                        <span>Всего </span>
                        {count}
                    </div>
                </div>
                <img
                    className={classNames(styles.filter__arrow, {
                        [styles.filter__arrow_open]: isOpen,
                    })}
                    src="/arrow.svg"
                    alt=""
                />
            </div>
            <div
                className={classNames(styles.filter__list, {
                    [styles.filter__list_open]: isOpen,
                })}
            >
                <div className={styles.filter__wrapper}>
                    {filters.map((item) =>
                    {
                        const formattedItem = {
                            name : MapItemType[item.name],
                            count : item.count,
                            checked : item.checked,
                            color : item.color
                        } 
                        return (
                        <FilterItem key={item.name} {...formattedItem} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
