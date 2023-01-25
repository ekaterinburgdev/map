import React, { useMemo } from 'react';
import Image from 'next/image';

import { Sources } from 'components/UI/Card/components/Sources/Sources';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Section } from 'components/UI/Card/components/Section/Section';
import { OKNInfo } from './components/OKNInfo/OKNInfo';

import { OKNCardContentProps } from './CardContent.types';

import styles from './CardContent.module.css';

export function OKNCardContent({ placemark }: OKNCardContentProps) {
    const { title, description } = useMemo(() => {
        const indexOfComma = placemark.name.indexOf(',');

        if (indexOfComma === -1) {
            return { title: placemark.name };
        }

        return {
            title: placemark.name.slice(0, indexOfComma),
            description: placemark.name.slice(indexOfComma + 1),
        };
    }, [placemark.name]);

    return (
        <div className={styles.popup}>
            {placemark.preview && (
                <a
                    href={placemark.preview.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.popup__imageLink}
                >
                    <Image
                        key={placemark.preview.title}
                        src={placemark.preview.url}
                        width={400}
                        height={256}
                        loader={({ src }) => src}
                        className={styles.popup__image}
                        alt={placemark.name}
                    />
                </a>
            )}
            <div className={styles.popup__content}>
                <Header coordinates={placemark.coords} title={title} description={description} />
                {placemark.address && (
                    <address className={styles.popup__address}>{placemark.address}</address>
                )}
                {placemark.date && (
                    <Section>
                        <ConstructionInfo date={placemark.date} />
                    </Section>
                )}
                <Section>
                    <OKNInfo number={placemark.oknNumber} status={placemark.isExist} />
                </Section>
                <Section>
                    <Sources sources={['okn']} />
                </Section>
            </div>
        </div>
    );
}
