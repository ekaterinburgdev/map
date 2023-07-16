import React, { useMemo } from 'react';

import { Section } from 'components/UI/Card/components/Section/Section';
import { Header } from 'components/UI/Card/components/Header/Header';

import { Info } from 'components/UI/Card/components/Info/Info';
import { Sources } from 'components/UI/Card/components/Sources/Sources';

import { InfoProps } from 'components/UI/Card/components/Info/Info.types';
import { EditButton } from 'components/Model/EditButton/EditButton';
import { DTPCardContentProps } from './CardContent.types';

import styles from './CardContent.module.css';
import { Participants } from './components/Participants/Participants';

export function DTPCardContent({ placemark }: DTPCardContentProps) {
    const { title, description } = useMemo(() => {
        const indexOfComma = placemark?.attributes.category?.indexOf(',') || -1;

        if (indexOfComma === -1) {
            return { title: placemark?.attributes.category };
        }

        return {
            title: placemark?.attributes.category.slice(0, indexOfComma),
            description: placemark?.attributes.category.slice(indexOfComma + 1),
        };
    }, [placemark?.attributes.category]);

    const date = useMemo(() => {
        if (!placemark?.attributes.datetime) {
            return null;
        }

        const parsedDate = new Date(placemark.attributes.datetime);

        return parsedDate.toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    }, [placemark?.attributes.datetime]);

    const environment = useMemo(() => {
        const result: InfoProps['infos'] = [];

        if (placemark?.attributes.light) {
            result.push({
                name: 'Время суток',
                text: placemark.attributes.light,
            });
        }

        if (placemark?.attributes.weather?.length) {
            const [firstCondition, ...conditions] = placemark.attributes.weather;
            const joinedConditions = [
                firstCondition,
                ...conditions.map((condition) => condition.toLowerCase()),
            ].join(', ');

            result.push({
                name: 'Погода',
                text: joinedConditions,
            });
        }

        if (placemark?.attributes.road_conditions?.length) {
            const [firstCondition, ...conditions] = placemark.attributes.road_conditions;
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
        placemark?.attributes.road_conditions,
        placemark?.attributes.weather,
        placemark?.attributes.light,
    ]);

    return placemark?.attributes ? (
        <div className={styles.popup}>
            <Header
                coordinates={placemark?.attributes.geometry.coordinates}
                title={title}
                description={description}
            />
            {date && <p className={styles.popup__extraText}>{date}</p>}
            {placemark?.attributes.address && (
                <address className={styles.popup__extraText}>
                    {placemark?.attributes.address}
                </address>
            )}
            <Section>
                <Info infos={environment} nameColor="#9baac3" />
            </Section>
            {placemark?.attributes.participants_count && (
                <Section>
                    <Participants
                        participants={placemark.attributes.participants}
                        vehicles={placemark.attributes.vehicles}
                    />
                </Section>
            )}
            <Section>
                <Sources sources={['dtp']} />
            </Section>
            <Section>
                <EditButton />
            </Section>
        </div>
    ) : null;
}
