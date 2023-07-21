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
    return (
        <div className={styles.popup}>
            <Header
                coordinates={placemark?.attributes.geometry.coordinates}
                title={placemark?.attributes.iconCaption || placemark.attributes.name}
            />
            {placemark?.attributes.description && placemark?.attributes.description.startsWith('http') && (
                <Section>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link link={placemark?.attributes.description} text="Подробнее об объекте" />
                </Section>
            )}
        </div>
    );
}
