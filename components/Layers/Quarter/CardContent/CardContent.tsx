import { QuarterObject } from 'components/Layers/Quarter/quarterObject';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Info } from 'components/UI/Card/components/Info/Info';
import { Section } from 'components/UI/Card/components/Section/Section';
import sectionStyles from 'components/UI/Card/components/Section/Section.module.css';
import { Sources } from 'components/UI/Card/components/Sources/Sources';
import { EditObjectButtonLink } from 'components/UI/EditObjectButtonLink/EditObjectButtonLink';
import { Icon } from 'components/UI/Icons';
import { IconType } from 'components/UI/Icons/Icons.types';
import styles from './CardContent.module.css';

type QuarterCardContentProps = {
    placemark?: QuarterObject;
};

export function QuarterCardContent({ placemark }: QuarterCardContentProps) {
    if (!placemark) return null;

    return (
        <div className={styles.popup}>
            <Header title={placemark.quarterTitle} />

            <div className={styles.description}>
                <a href={placemark.url}>
                    Посмотреть телефон и почту квартального&nbsp;
                    <Icon type={IconType.External} color="#000" />
                </a>
            </div>

            <Section>
                <Info
                    nameColor="#9baac3"
                    infos={[
                        {
                            name: 'Район',
                            text: placemark.districtTitle,
                        },
                        // {
                        //     name: 'Границы квартала',
                        //     text: placemark.quarterDescription,
                        // },
                    ]}
                />
            </Section>

            <Section>
                <Sources sources={['ekb']} />
            </Section>
            <Section>
                <div className={sectionStyles.block_inline}>
                    <EditObjectButtonLink
                        text="Дополнить или поправить"
                        address={placemark?.quarterTitle}
                    />
                </div>
            </Section>
        </div>
    );
}
