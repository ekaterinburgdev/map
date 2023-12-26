import React, { useMemo } from 'react';
import classNames from 'classnames';

import { Info } from 'components/Card/components/Info/Info';
import { Label } from 'components/Card/components/Label/Label';
import { Icon } from 'shared/UI/Icons';
import { IconType } from 'shared/UI/Icons/Icons.types';

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
                        {isLost && (
                            <Label color="#e63223" backgroundColor="rgba(230, 50, 35, 0.24)">
                                Утрачен
                            </Label>
                        )}
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
                    <Icon type={IconType.OKN} />
                </div>
            </div>
            {/* <div className={styles.oknInfo__file}>
                <div className={styles.oknInfo__fileNameWrapper}>
                    <Icon type={IconType.Pdf} color="#c8a563" />
                    <div className={styles.oknInfo__fileName}></div>
                </div>
                <div className={styles.oknInfo__fileSize}>19,6 МБ</div>
            </div> */}
        </div>
    );
}
