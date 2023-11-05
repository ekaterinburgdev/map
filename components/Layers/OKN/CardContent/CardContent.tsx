import { useMemo } from 'react';
import { ConstructionInfo } from 'components/UI/Card/components/ConstructionInfo/ConstructionInfo';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Section } from 'components/UI/Card/components/Section/Section';
import { Sources } from 'components/UI/Card/components/Sources/Sources';
import DownloadButton from 'components/UI/DownloadButton/DownloadButton';
import { EditObjectButtonLink } from 'components/UI/EditObjectButtonLink/EditObjectButtonLink';
import { OknObject } from '../oknObject';
import styles from './CardContent.module.css';
import { OKNInfo } from './components/OKNInfo/OKNInfo';

export function OKNCardContent({ placemark }: { placemark: OknObject }) {
    const { title, description } = useMemo(() => {
        const indexOfComma = placemark?.properties.name?.indexOf(',') || -1;

        if (indexOfComma === -1) {
            return { title: placemark?.properties.name };
        }

        return {
            title: placemark?.properties.name.slice(0, indexOfComma),
            description: placemark?.properties.name.slice(indexOfComma + 1),
        };
    }, [placemark?.properties.name]);

    return placemark?.properties ? (
        <div className={styles.popup}>
            {placemark?.properties.img && (
                <a
                    href={placemark?.properties.img.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.popup__imageLink}
                >
                    <img
                        key={placemark?.properties.img.title}
                        src={placemark?.properties.img.url}
                        width={400}
                        height={256}
                        className={styles.popup__image}
                        alt={placemark?.properties.name}
                    />
                </a>
            )}
            <div className={styles.popup__content}>
                <Header
                    coordinates={placemark?.geometry.coordinates}
                    title={title}
                    description={description}
                />
                {placemark?.properties.address && (
                    <address className={styles.popup__address}>
                        {placemark?.properties.address}
                    </address>
                )}
                {placemark?.properties.date && (
                    <Section>
                        <ConstructionInfo date={placemark?.properties.date} />
                    </Section>
                )}
                <Section>
                    <OKNInfo
                        number={placemark?.properties.okn_number}
                        status={placemark?.properties.isExist}
                    />
                </Section>
                <Section>
                    <DownloadButton type="brown" />
                </Section>
                <Section>
                    <Sources sources={['okn']} />
                </Section>
                {placemark?.properties?.address && (
                    <Section>
                        <EditObjectButtonLink address={placemark?.properties?.address} />
                    </Section>
                )}
            </div>
        </div>
    ) : null;
}
