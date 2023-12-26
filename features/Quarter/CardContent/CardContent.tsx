import { QuarterObject } from 'features/Quarter/quarterObject';
import { Button, ButtonSize, ButtonType } from 'shared/UI/Button/Button';
import { Header } from 'components/Card/components/Header/Header';
import { Info } from 'components/Card/components/Info/Info';
import { Section } from 'components/Card/components/Section/Section';
import sectionStyles from 'components/Card/components/Section/Section.module.css';
import { Sources } from 'components/Card/components/Sources/Sources';
import { EditObjectButtonLink } from 'components/Card/components/EditObjectButtonLink/EditObjectButtonLink';
import { Icon } from 'shared/UI/Icons';
import { IconType } from 'shared/UI/Icons/Icons.types';
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
        <Button
          size={ButtonSize.SMALL}
          onClick={() => {}}
          link={placemark.url}
          type={ButtonType.YELLOW}
        >
          Посмотреть телефон и почту квартального&nbsp;
          <Icon type={IconType.External} color="#000" />
        </Button>
      </div>

      <Section>
        <Info
          nameColor="#9baac3"
          infos={[
            {
              name: 'Район',
              text: placemark.districtTitle,
            },
          ]}
        />
      </Section>

      <Section>
        <Sources sources={['ekb_quarter']} />
      </Section>
      <Section>
        <div className={sectionStyles.block_inline}>
          <EditObjectButtonLink text="Дополнить или поправить" address={placemark?.quarterTitle} />
        </div>
      </Section>
    </div>
  );
}
