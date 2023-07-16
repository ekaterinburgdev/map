import React, { useMemo } from 'react';

import { Sources } from 'components/UI/Card/components/Sources/Sources';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Section } from 'components/UI/Card/components/Section/Section';
import { EditButton } from 'components/Model/EditButton/EditButton';
import { OKNInfo } from './components/OKNInfo/OKNInfo';

import { OKNCardContentProps } from './CardContent.types';

import styles from './CardContent.module.css';

export function OKNCardContent({ placemark }: OKNCardContentProps) {
    const { title, description } = useMemo(() => {
        const indexOfComma = placemark?.attributes.name?.indexOf(',') || -1;

        if (indexOfComma === -1) {
            return { title: placemark?.attributes.name };
        }

        return {
            title: placemark?.attributes.name.slice(0, indexOfComma),
            description: placemark?.attributes.name.slice(indexOfComma + 1),
        };
    }, [placemark?.attributes.name]);

    return placemark?.attributes ? (
        <div className={styles.popup}>
            {placemark?.attributes.img && (
                <a
                    href={placemark?.attributes.img.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.popup__imageLink}
                >
                    <img
                        key={placemark?.attributes.img.title}
                        src={placemark?.attributes.img.url}
                        width={400}
                        height={256}
                        className={styles.popup__image}
                        alt={placemark?.attributes.name}
                    />
                </a>
            )}
            <div className={styles.popup__content}>
                <Header
                    coordinates={placemark?.attributes.geometry.coordinates}
                    title={title}
                    description={description}
                />
                {placemark?.attributes.address && (
                    <address className={styles.popup__address}>
                        {placemark?.attributes.address}
                    </address>
                )}
                {placemark?.attributes.date && (
                    <Section>
                        <ConstructionInfo date={placemark?.attributes.date} />
                    </Section>
                )}
                <Section>
                    <OKNInfo
                        number={placemark?.attributes.okn_number}
                        status={placemark?.attributes.isExist}
                    />
                </Section>
                <Section>
                    <Sources sources={['okn']} />
                </Section>
                <Section>
                    <EditButton />
                </Section>
            </div>
        </div>
    ) : null;
}
