import { Header } from 'components/Card/components/Header/Header';
import { Label } from 'shared/UI/Label/Label';
import { Section } from 'components/Card/components/Section/Section';
import { DESIGN_MAP_HOST } from 'features/DesignCode/designCode';
import styles from 'styles/CardContent.module.css';
import { Sources } from 'components/Card/components/Sources/Sources';
import { SOURCES_BY_TYPE } from 'constants/sources';
import { SourceType } from 'types/Sources.types';
import { DesignCodeObject } from '../designCodeObject';
import { DESIGN_CODE_ITEMS_COLORS } from '../DesignCode.constants';

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
                <Label color={DESIGN_CODE_ITEMS_COLORS[placemark.type]}>{placemark.type}</Label>
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
                <Sources sources={[SOURCES_BY_TYPE[SourceType.design_objects_map]]} />
            </Section>
        </div>
    ) : null;
}
