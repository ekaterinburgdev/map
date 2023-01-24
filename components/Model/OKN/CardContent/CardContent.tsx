import React, { useMemo } from 'react';
import Image from 'next/image';
import { MapItem } from 'common/types/map-item';

import { Sources } from 'components/UI/Card/components/Sources/Sources';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Block } from 'components/UI/Card/components/Block/Block';
import { OKNInfo } from './components/OKNInfo/OKNInfo';
import styles from './CardContent.module.css';

interface OKNCardContentProps {
    placemark: MapItem;
}

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
                    <Block>
                        <ConstructionInfo date={placemark.date} />
                    </Block>
                )}
                <Block>
                    <OKNInfo number={placemark.oknNumber} status={placemark.isExist} />
                </Block>
                <Block>
                    <Sources sources={['okn']} />
                </Block>
            </div>
        </div>
    );
}
