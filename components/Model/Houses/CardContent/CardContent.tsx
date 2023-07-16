import React, { useMemo } from 'react';

import { Section } from 'components/UI/Card/components/Section/Section';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Label } from 'components/UI/Card/components/Label/Label';

import { Info } from 'components/UI/Card/components/Info/Info';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Sources } from 'components/UI/Card/components/Sources/Sources';

import { EditButtonLink } from 'components/Model/EditButtonLink/EditButtonLink';
import { HousesCardContentProps } from './CardContent.types';

import styles from './CardContent.module.css';

export function HousesCardContent({ placemark }: HousesCardContentProps) {
    const isEmergency = useMemo(
        () => placemark?.attributes.Condition === 'Аварийный',
        [placemark?.attributes.Condition],
    );

    const aboutHouse = useMemo(() => {
        const result = [];
        if (placemark?.attributes.Management_company) {
            result.push({
                name: 'Управляющая компания',
                text: placemark?.attributes.Management_company,
            });
        }

        if (placemark?.attributes.WearAndTear) {
            result.push({
                name: 'Износ',
                text: `${placemark?.attributes.WearAndTear}%`,
            });
        }

        if (placemark?.attributes.Series) {
            result.push({
                name: 'Серия дома',
                text: placemark?.attributes.Series,
            });
        }

        if (placemark?.attributes.Floors) {
            result.push({
                name: 'Количество этажей',
                text: placemark?.attributes.Floors,
            });
        }

        return result;
    }, [
        placemark?.attributes.Management_company,
        placemark?.attributes.WearAndTear,
        placemark?.attributes.Series,
        placemark?.attributes.Floors,
    ]);

    return placemark ? (
        <div className={styles.popup}>
            <Header
                coordinates={placemark?.attributes.borders?.coordinates?.[0]}
                title={placemark?.attributes.Address}
            />
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
            {placemark?.attributes.Year && (
                <Section>
                    <ConstructionInfo date={String(placemark?.attributes.Year)} />
                </Section>
            )}
            <Section>
                <Sources sources={['mingkh', 'domaekb']} />
            </Section>
            <Section>
                <EditButtonLink address={placemark?.attributes.Address} />
            </Section>
        </div>
    ) : null;
}
