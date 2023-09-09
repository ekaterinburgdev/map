'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl';

import { Section } from 'components/UI/Card/components/Section/Section';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Label } from 'components/UI/Card/components/Label/Label';
import { Info } from 'components/UI/Card/components/Info/Info';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Sources } from 'components/UI/Card/components/Sources/Sources';
import { EditObjectButtonLink } from 'components/UI/EditObjectButtonLink/EditObjectButtonLink';
import { FilterLoader } from 'components/UI/Filters/components/Loader/FilterLoader';
import { usePopup } from 'components/Map/providers/usePopup';
import { MapContext } from 'components/Map/providers/MapProvider';
import { HouseObject } from 'components/Layers/Houses/houseBase';

import HealthProgress from '../HealthProgress/HealthProgress';
import styles from './CardContent.module.css';

export function HousesCardContent() {
    const { popupId } = usePopup();
    const { ekbMap } = useMap();
    const { loading } = useContext(MapContext);

    const [placemark, setPlacemark] = useState<HouseObject | null>(null);

    useEffect(() => {
        const map = ekbMap?.getMap?.();

        if (!map || !popupId || loading) {
            return;
        }

        try {
            const [lat, lng] = popupId.split('_');

            const house = map.queryRenderedFeatures(map.project({ lat: +lat, lng: +lng }), {
                layers: ['building'],
            })?.[0]?.properties;

            if (!house) return;

            setPlacemark({
                id: popupId,
                attributes: {
                    Address: [house['addr:street'], house['addr:housenumber']]
                        .filter(Boolean)
                        .join(', '),
                    Management_company: house['building:management'],
                    Series: house['building:series'],
                    Condition: house['building:condition'],
                    Floors: house['building:levels'],
                    Year: house['building:year'],
                    Emergency: house['building:emergency'],
                    WearAndTear: house['building:health'],
                    borders: {
                        coordinates: [[+lat, +lng]],
                    },
                },
            });
        } catch (error) {
            console.error(error);
        }
    }, [ekbMap, popupId, loading]);

    useEffect(() => {
        const map = ekbMap?.getMap?.();

        if (!map || !popupId) {
            return;
        }

        // center map only on loading step
        if (loading) {
            try {
                const [lat, lng] = popupId.split('_');

                map.flyTo({ center: { lat: +lat, lng: +lng } });
            } catch (error) {
                console.error(error);
            }
        }
    }, [ekbMap, popupId, loading]);

    const isEmergency = useMemo(
        () => placemark?.attributes?.Condition === 'Аварийный',
        [placemark?.attributes?.Condition],
    );

    const aboutHouse = useMemo(() => {
        const result = [];
        if (placemark?.attributes?.Management_company) {
            result.push({
                name: 'Управляющая компания',
                text: placemark?.attributes?.Management_company,
            });
        }

        if (placemark?.attributes?.WearAndTear) {
            result.push({
                name: 'Износ',
                text: `${placemark?.attributes?.WearAndTear}%`,
                content: <HealthProgress percent={placemark?.attributes?.WearAndTear} />,
            });
        }

        if (placemark?.attributes?.Series) {
            result.push({
                name: 'Серия дома',
                text: placemark?.attributes?.Series,
            });
        }

        if (placemark?.attributes?.Floors) {
            result.push({
                name: 'Количество этажей',
                text: placemark?.attributes?.Floors,
            });
        }

        return result;
    }, [
        placemark?.attributes?.Management_company,
        placemark?.attributes?.WearAndTear,
        placemark?.attributes?.Series,
        placemark?.attributes?.Floors,
    ]);

    if (loading) {
        return (
            <div className={styles.popup}>
                <FilterLoader />
            </div>
        );
    }

    if (!placemark?.attributes) {
        return null;
    }

    return (
        <div className={styles.popup}>
            <Header
                coordinates={placemark?.attributes.borders?.coordinates?.[0]}
                title={placemark?.attributes.Address}
            />
            {(isEmergency || aboutHouse?.length > 0) && (
                <Section>
                    {isEmergency && (
                        <div className={styles.popup__emergencyLabel}>
                            <Label color="#e63223" backgroundColor="rgba(230, 50, 35, 0.24)">
                                {placemark?.attributes.Condition}
                            </Label>
                        </div>
                    )}
                    <Info nameColor="#9baac3" infos={aboutHouse} />
                </Section>
            )}
            {placemark?.attributes.Year && (
                <Section>
                    <ConstructionInfo date={String(placemark?.attributes.Year)} />
                </Section>
            )}
            <Section>
                <Sources sources={['howoldthishouse', 'mingkh', 'domaekb']} />
            </Section>
            <Section>
                <EditObjectButtonLink address={placemark?.attributes.Address} />
            </Section>
        </div>
    );
}
