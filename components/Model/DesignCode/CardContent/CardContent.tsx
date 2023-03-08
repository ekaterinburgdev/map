import React from 'react';

import Image from 'next/image';
import { Section } from 'components/UI/Card/components/Section/Section';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Label } from 'components/UI/Card/components/Label/Label';

import { DESIGN_MAP_HOST } from 'common/data/designCode/designCode';
import { DESIGN_CODE_MARKER_COLOR_BY_TYPE } from '../MapData/MapData.constants';
import { DesignCodeCardContentProps } from './CardContent.types';

import styles from './CardContent.module.css';

export function DesignCodeCardContent({ placemark }: DesignCodeCardContentProps) {
    return placemark ? (
        <div className={styles.popup}>
            <Header
                coordinates={placemark.coords}
                title={placemark.name}
                description={placemark.description}
            />
            {placemark.street && (
                <address className={styles.popup__address}>{placemark.street}</address>
            )}
            <Section>
                <Label color={DESIGN_CODE_MARKER_COLOR_BY_TYPE[placemark.type]}>
                    {placemark.type}
                </Label>
            </Section>
            <Section>
                {placemark.images.map((image) => {
                    const imageData = image.m || image.s;

                    return (
                        <a
                            href={`${DESIGN_MAP_HOST}${imageData.src}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                key={image.id}
                                src={imageData.src}
                                width={imageData.width}
                                height={imageData.height}
                                loader={({ src }) => `${DESIGN_MAP_HOST}${src}`}
                                className={styles.popup__image}
                                alt={placemark.name}
                            />
                        </a>
                    );
                })}
            </Section>
        </div>
    ) : null;
}
