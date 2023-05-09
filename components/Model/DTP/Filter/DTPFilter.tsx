import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setData } from 'state/features/dataLayers';

import { dtp, DTPFiltersParams } from 'common/data/dtp/dtp';
import { DtpParticipantType } from 'common/data/dtp/dtpParticipantType';
import { DtpSeverityType } from 'common/data/dtp/dtpSeverityType';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';
import { FilterType } from 'components/UI/Filters/Filters.types';
import { RangeBaseFilter } from 'components/Model/RangeBaseFilter/RangeBaseFilter';
import { MinMax } from 'components/UI/RangeHistogram/types';

import {
    CURRENT_YEAR,
    DTP_PARTICIPANT_CONFIG,
    SEVERITY_CONFIG,
    YEARS_FILTERS_DATA,
} from '../DTP.constants';

import {
    dtpParticipantInitalState,
    dtpParticipantReducer,
    dtpSeverityInitalState,
    dtpSeverityReducer,
} from './DTPFilter.state';

import styles from './DTPFilter.module.css';

type ParticipantCountEntries = [DtpParticipantType, number][];
type SeverityCountEntries = [DtpSeverityType, number][];

const DEFAULT_MIN_YEAR = CURRENT_YEAR - 1;

export function DTPFilter() {
    const dispatch = useDispatch();
    const [severityState, dispatchSeverity] = useReducer(
        dtpSeverityReducer,
        dtpSeverityInitalState,
    );
    const [participantState, dispatchParticipant] = useReducer(
        dtpParticipantReducer,
        dtpParticipantInitalState,
    );
    const [yearsLoaded, setYearsLoaded] = useState(false);
    const [participantCount, setParticipantCount] = useState<ParticipantCountEntries>(null);
    const [severityCount, setSeverityCount] = useState<SeverityCountEntries>(null);
    const [yearsState, setYearsState] = useState<MinMax>({
        min: DEFAULT_MIN_YEAR,
        max: CURRENT_YEAR,
    });

    useEffect(() => {
        dtp.getParticipantFilters().then((participantFilters: ParticipantCountEntries) => {
            const sortedParticipantCount = participantFilters.sort(
                ([, countA], [, countB]) => countB - countA,
            );

            setParticipantCount(sortedParticipantCount);
        });
    }, []);

    useEffect(() => {
        dtp.getSeverityFilters().then((severityFilters: SeverityCountEntries) => {
            const sortedSeverityCount = severityFilters.sort(
                ([, countA], [, countB]) => countB - countA,
            );

            setSeverityCount(sortedSeverityCount);
        });
    }, []);

    const onSeverityChange = useCallback(
        (severityType: DtpSeverityType) => () => {
            dispatchSeverity({ type: 'toggle', severityType });
        },
        [],
    );

    const onParticipantChange = useCallback(
        (participantType: DtpParticipantType) => () => {
            dispatchParticipant({ type: 'toggle', participantType });
        },
        [],
    );

    const onYearsChange = useCallback((range: MinMax) => setYearsState(range), []);

    const getHistogramData = useCallback(async () => {
        const dtpFilters = await dtp.getYearsFilters(YEARS_FILTERS_DATA);

        const histogramData = YEARS_FILTERS_DATA.map((yearsItemData, idx) => ({
            ...yearsItemData,
            value: dtpFilters[idx],
        }));

        setYearsLoaded(true);

        return histogramData;
    }, []);

    useEffect(() => {
        const filters: DTPFiltersParams = {
            years: {
                from: yearsState.min,
                to: yearsState.max,
            },
        };

        const severities = Object.entries(severityState).reduce((acc, [type, value]) => {
            if (value) {
                acc.push(type);
            }

            return acc;
        }, []) as DtpSeverityType[];
        const participants = Object.entries(participantState).reduce((acc, [type, value]) => {
            if (value) {
                acc.push(type);
            }

            return acc;
        }, []) as DtpParticipantType[];

        if (!severities.length || !participants.length) {
            dispatch(setData({ type: FilterType.DTP, data: [] }));

            return;
        }

        filters.severity = severities;
        filters.participants = participants;

        dtp.getObjects(filters).then((dtps) => {
            dispatch(
                setData({
                    type: FilterType.DTP,
                    data: dtps,
                }),
            );
        });
    }, [dispatch, severityState, participantState, yearsState.min, yearsState.max]);

    const shouldShowLoader = useMemo(
        () => !yearsLoaded || !participantCount || !severityCount,
        [yearsLoaded, participantCount, severityCount],
    );

    const shouldShowCheckboxes = useMemo(
        () => participantCount && severityCount,
        [participantCount, severityCount],
    );

    return (
        <>
            <RangeBaseFilter
                defaultMin={CURRENT_YEAR - 1}
                defaultMax={CURRENT_YEAR}
                filterType={FilterType.DTP}
                getHistogramData={getHistogramData}
                onChangeCallback={onYearsChange}
                noLoader
            />
            {shouldShowCheckboxes && (
                <>
                    <h2 className={styles.DTPFilter__sectionTitle}>Участники ДТП</h2>
                    {participantCount
                        && participantCount.map(([type, count], i) => (
                            <Checkbox
                                id={`${type}-line-${i}`}
                                checked={participantState[type]}
                                color="#3c4669"
                                onClick={onParticipantChange(type)}
                                mix={styles.DTPFilter__checkboxContent}
                                key={`filter-${type}-participant-dtp`}
                            >
                                <div className={styles.DTPFilter__checkboxLabel}>
                                    {DTP_PARTICIPANT_CONFIG[type]?.label || type}
                                    <span className={styles.DTPFilter__objectsCount}>{count}</span>
                                </div>
                            </Checkbox>
                        ))}
                    <h2 className={styles.DTPFilter__sectionTitle}>Вред здоровью</h2>
                    {severityCount
                        && severityCount.map(([type, count], i) => (
                            <Checkbox
                                id={`${type}-line-${i}`}
                                checked={severityState[type]}
                                color={SEVERITY_CONFIG[type].color}
                                onClick={onSeverityChange(type)}
                                mix={styles.DTPFilter__checkboxContent}
                                key={`filter-${type}-severity-dtp`}
                            >
                                <div className={styles.DTPFilter__checkboxLabel}>
                                    {type}
                                    <span className={styles.DTPFilter__objectsCount}>{count}</span>
                                </div>
                            </Checkbox>
                        ))}
                </>
            )}
            {shouldShowLoader && <FilterLoader />}
        </>
    );
}