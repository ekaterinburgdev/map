import React from 'react';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Section } from 'components/UI/Card/components/Section/Section';
import { Link } from 'components/UI/Card/components/Link/Link';
import styles from './CardContent.module.css';

type TLinesCardContentProps = {
    placemark: object
};

export function LinesCardContent({ placemark }: TLinesCardContentProps) {
    return (
        <div className={styles.popup}>
            <Header
                coordinates={placemark.attributes.geometry.coordinates}
                title={placemark.attributes.iconCaption || placemark.attributes.name}
            />
            {placemark.attributes.description && placemark.attributes.description.startsWith('http') && (
                <Section>
                    <Link link={placemark.attributes.description} text="Подробнее об объекте" />
                </Section>
            )}
        </div>
    );
}
