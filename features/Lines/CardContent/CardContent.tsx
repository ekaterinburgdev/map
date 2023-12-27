import React from 'react';
import { Header } from 'components/Card/components/Header/Header';
import { Section } from 'components/Card/components/Section/Section';
import { Link } from 'shared/UI/Link/Link';
import styles from 'styles/CardContent.module.css';
import { LineObject } from '../lineType';

type TLinesCardContentProps = {
    placemark?: LineObject;
};

export function LinesCardContent({ placemark }: TLinesCardContentProps) {
    if (!placemark) return null;

    return (
        <div className={styles.popup}>
            <Header
                coordinates={placemark?.geometry.coordinates}
                title={placemark.properties.title || placemark.properties.description}
            />
            {placemark.properties.description?.startsWith('http') && (
                <Section>
                    <Link href={placemark.properties.description} text="Подробнее об объекте" />
                </Section>
            )}
        </div>
    );
}
