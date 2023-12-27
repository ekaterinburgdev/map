import { Header } from 'components/Card/components/Header/Header';
import { Label } from 'shared/UI/Label/Label';
import { Section } from 'components/Card/components/Section/Section';

import { DESIGN_MAP_HOST } from 'features/DesignCode/designCode';
import styles from 'styles/CardContent.module.css';
import { Sources } from 'components/Card/components/Sources/Sources';
import { DESIGN_CODE_MARKER_COLOR_BY_TYPE } from '../MapData/MapData.constants';

import { DesignCodeObject } from '../designCodeObject';

export function DesignCodeCardContent({ placemark }: { placemark?: DesignCodeObject }) {
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
                    const imageSrc = `${DESIGN_MAP_HOST}${imageData.src}`;

                    return (
                        <a key={imageData.src} href={imageSrc} target="_blank" rel="noreferrer">
                            <img
                                src={imageSrc}
                                width={imageData.width}
                                height={imageData.width}
                                className={styles.popup__image}
                                alt={placemark.name}
                            />
                        </a>
                    );
                })}
            </Section>
            <Section>
                <Sources sources={['design_objects_map']} />
            </Section>
        </div>
    ) : null;
}
