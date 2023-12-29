import { Tag } from 'sloy-ui';
import { OverrideCardFn } from 'sloy-map';
import HealthProgress from 'features/CustomCardContent/HealthProgress/HealthProgress';
import { DownloadButton } from 'features/CustomCardContent/DownloadButton/DownloadButton';
import { FeedbackButton } from 'features/CustomCardContent/FeedbackButton/FeedbackButton';
import facades from 'public/ekb-facades.json';
import styles from 'features/CustomCardContent/CardContent.module.css';
import { OKNInfo } from 'features/CustomCardContent/OKNInfo/OKNInfo';
import { Participants } from 'features/CustomCardContent/Participants/Participants';

export const overrideCard: OverrideCardFn = ({ cardProps, values = {}, source }) => {
    const emergency = values['building:emergency'];
    const isEmergency = emergency === 'Аварийность';
    const facade = facades[values['osm:id']];

    if (isEmergency) {
        cardProps.blocks.push({
            type: 'value',
            value: (
                <Tag style={{ marginTop: 12 }} color="#e63223">
                    {values['building:condition']}
                </Tag>
            ),
        });
    }

    cardProps.blocks = cardProps.blocks.map((item) => {
        if (item.id === 'building:health') {
            const health = Number(values[item.id]);

            return {
                ...item,
                value: (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {health} %
                        <HealthProgress percent={health} isEmergency={isEmergency} />
                    </div>
                ),
            };
        }

        return item;
    });

    if (facade) {
        cardProps.blocks.push({
            type: 'section',
            title: 'Дизайн-код фасада',
            value: <DownloadButton type="primary" name={facade.name} link={facade.link} />,
        });
    }

    if (source.id === 'ekbOknSource') {
        cardProps.blocks.push({
            type: 'section',
            value: <OKNInfo number={values.okn_number} status={values.isExist} />,
        });
    }

    if (source.id === 'ekbDtpSource' && values.participants && values.vehicles) {
        cardProps.blocks.push({
            type: 'section',
            value: <Participants participants={values.participants} vehicles={values.vehicles} />,
        });
    }

    if (source.id === 'ekbDesigncodeSource') {
        cardProps.blocks.push({
            type: 'section',
            value: (
                <>
                    {(values.images || []).map((image) => {
                        const imageData = image.m || image.s;
                        const imageSrc = `https://map.ekaterinburg.design${imageData.src}`;

                        return (
                            <a key={imageData.src} href={imageSrc} target="_blank" rel="noreferrer">
                                <img
                                    src={imageSrc}
                                    width={imageData.width}
                                    height={imageData.width}
                                    className={styles.popup__image}
                                    alt={values.name}
                                />
                            </a>
                        );
                    })}
                </>
            ),
        });
    }

    cardProps.footerActions = <FeedbackButton address={String(cardProps.title)} />;

    return cardProps;
};
