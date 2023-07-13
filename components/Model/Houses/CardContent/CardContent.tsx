'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl';

import { Section } from 'components/UI/Card/components/Section/Section';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Label } from 'components/UI/Card/components/Label/Label';

import { Info } from 'components/UI/Card/components/Info/Info';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Sources } from 'components/UI/Card/components/Sources/Sources';

import { EditObjectButtonLink } from 'components/Model/EditButtonLink/EditObjectButtonLink';

import { usePopup } from 'components/UI/Map/providers/usePopup';
import { MapContext } from 'components/UI/Map/providers/MapProvider';
import { HouseObject } from 'common/data/base/houseBase';

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

    if (!placemark?.attributes) {
        return null;
    }

    return (
        <div className={styles.popup}>
            {placemark?.attributes.Address && (
                <Header
                    coordinates={placemark?.attributes.borders?.coordinates?.[0]}
                    title={placemark?.attributes.Address}
                />
            )}
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
                <Sources sources={['mingkh', 'domaekb']} />
            </Section>
            <Section>
                <EditObjectButtonLink address={placemark?.attributes.Address} />
            </Section>
        </div>
    );
}
