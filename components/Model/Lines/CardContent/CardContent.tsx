import React from 'react';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Section } from 'components/UI/Card/components/Section/Section';
import { Link } from 'components/UI/Card/components/Link/Link';
import { LineObject } from 'common/data/lines/lineType';
import styles from './CardContent.module.css';

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
