import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Tag } from 'sloy-ui';
import { Info } from 'features/CustomCardContent/Info/Info';
import { SvgOknIcon } from './SvgOknIcon';
import styles from './OKNInfo.module.css';

export type OKNInfoProps = {
    number: string;
    status: string;
};

export function OKNInfo({ number, status }: OKNInfoProps) {
    const oknNumberInfo = useMemo(
        () => [
            {
                name: 'Номер ОКН',
                text: number,
            },
        ],
        [number],
    );

    const isLost = status === 'Утраченный';

    return (
        <div className={styles.oknInfo}>
            <div className={styles.oknInfo__wrapper}>
                <div className={styles.oknInfo__text}>
                    <div>
                        {isLost && <Tag color="#e63223">Утрачен</Tag>}
                        <div
                            className={classNames(styles.oknInfo__oknTitle, {
                                [styles.oknInfo__oknTitle_lost]: isLost,
                            })}
                        >
                            Объект культурного наследия федерального значения
                        </div>
                    </div>
                    <Info infos={oknNumberInfo} nameColor="rgba(200, 165, 99, 0.56)" />
                </div>
                <div
                    className={classNames(styles.oknInfo__oknLogo, {
                        [styles.oknInfo__oknLogo_lost]: isLost,
                    })}
                >
                    <SvgOknIcon />
                </div>
            </div>
        </div>
    );
}
