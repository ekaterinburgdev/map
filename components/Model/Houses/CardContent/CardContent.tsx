import React, { useMemo } from 'react';

import { Section } from 'components/UI/Card/components/Section/Section';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Label } from 'components/UI/Card/components/Label/Label';

import { Info } from 'components/UI/Card/components/Info/Info';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Sources } from 'components/UI/Card/components/Sources/Sources';

import { HousesCardContentProps } from './CardContent.types';

import styles from './CardContent.module.css';

export function HousesCardContent({ placemark }: HousesCardContentProps) {
    const isEmergency = useMemo(() => placemark.condition === 'Аварийный', [placemark.condition]);
    const aboutHouse = useMemo(() => {
        const result = [];
        if (placemark.company) {
            result.push({
                name: 'Управляющая компания',
                text: placemark.company,
            });
        }

        if (placemark.wearTear) {
            result.push({
                name: 'Износ',
                text: `${placemark.wearTear}%`,
            });
        }

        if (placemark.series) {
            result.push({
                name: 'Серия дома',
                text: placemark.series,
            });
        }

        if (placemark.floors) {
            result.push({
                name: 'Количество этажей',
                text: placemark.floors,
            });
        }

        return result;
    }, [placemark.company, placemark.wearTear, placemark.series, placemark.floors]);

    return (
        <div className={styles.popup}>
            <Header coordinates={placemark.coords} title={placemark.name} />
            <Section>
                {isEmergency && (
                    <div className={styles.popup__emergencyLabel}>
                        <Label color="#e63223" backgroundColor="rgba(230, 50, 35, 0.24)">
                            {placemark.condition}
                        </Label>
                    </div>
                )}
                <Info nameColor="#9baac3" infos={aboutHouse} />
            </Section>
            <Section>
                <ConstructionInfo date={String(placemark.date)} />
            </Section>
            <Section>
                <Sources sources={['mingkh', 'domaekb']} />
            </Section>
        </div>
    );
}
