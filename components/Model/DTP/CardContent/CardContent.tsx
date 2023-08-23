import React, { useMemo } from 'react';

import { Section } from 'components/UI/Card/components/Section/Section';
import { Header } from 'components/UI/Card/components/Header/Header';

import { Info } from 'components/UI/Card/components/Info/Info';
import { Sources } from 'components/UI/Card/components/Sources/Sources';

import { InfoProps } from 'components/UI/Card/components/Info/Info.types';
import { DTPCardContentProps } from './CardContent.types';

import styles from './CardContent.module.css';
import { Participants } from './components/Participants/Participants';

export function DTPCardContent({ placemark }: DTPCardContentProps) {
    const { title, description } = useMemo(() => {
        const indexOfComma = placemark?.properties.category?.indexOf(',') || -1;

        if (indexOfComma === -1) {
            return { title: placemark?.properties.category };
        }

        return {
            title: placemark?.properties.category.slice(0, indexOfComma),
            description: placemark?.properties.category.slice(indexOfComma + 1),
        };
    }, [placemark?.properties.category]);

    const date = useMemo(() => {
        if (!placemark?.properties.datetime) {
            return null;
        }

        const parsedDate = new Date(placemark.properties.datetime);

        return parsedDate.toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    }, [placemark?.properties.datetime]);

    const environment = useMemo(() => {
        const result: InfoProps['infos'] = [];

        if (placemark?.properties.light) {
            result.push({
                name: 'Время суток',
                text: placemark.properties.light,
            });
        }

        if (placemark?.properties.weather?.length) {
            const [firstCondition, ...conditions] = placemark.properties.weather;
            const joinedConditions = [
                firstCondition,
                ...conditions.map((condition) => condition.toLowerCase()),
            ].join(', ');

            result.push({
                name: 'Погода',
                text: joinedConditions,
            });
        }

        if (placemark?.properties.road_conditions?.length) {
            const [firstCondition, ...conditions] = placemark.properties.road_conditions;
            const joinedConditions = [
                firstCondition,
                ...conditions.map((condition) => condition.toLowerCase()),
            ].join(', ');

            result.push({
                name: 'Дорожные условия',
                text: joinedConditions,
            });
        }

        return result;
    }, [
        placemark?.properties.road_conditions,
        placemark?.properties.weather,
        placemark?.properties.light,
    ]);

    return placemark?.properties ? (
        <div className={styles.popup}>
            <Header
                coordinates={placemark?.geometry.coordinates}
                title={title}
                description={description}
            />
            {date && <p className={styles.popup__extraText}>{date}</p>}
            {placemark?.properties.address && (
                <address className={styles.popup__extraText}>
                    {placemark?.properties.address}
                </address>
            )}
            <Section>
                <Info infos={environment} nameColor="#9baac3" />
            </Section>
            {placemark?.properties.participants_count && (
                <Section>
                    <Participants
                        participants={placemark.properties.participants}
                        vehicles={placemark.properties.vehicles}
                    />
                </Section>
            )}
            <Section>
                <Sources sources={['dtp']} />
            </Section>
        </div>
    ) : null;
}
