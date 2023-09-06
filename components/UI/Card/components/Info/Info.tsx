import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { InfoProps } from './Info.types';

import HealthProgress from 'components/Layers/Houses/HealthProgress/HealthProgress';
import styles from './Info.module.css';

export function Info({ infos, nameColor, textColor, rowDirection }: InfoProps) {
    const [healthProgressColor, setHealthProgressColor] = useState<string | null>(null);

    useEffect(() => {}, []);

    return (
        <div
            className={classNames(styles.info, {
                [styles.info_row]: rowDirection,
            })}
        >
            {infos.map(({ name, text }) => (
                <div key={name}>
                    {name && (
                        <div className={styles.info__name} style={{ color: nameColor }}>
                            {name}
                        </div>
                    )}
                    {text && (
                        <div className={styles.info__text} style={{ color: textColor }}>
                            {text}
                            {name === 'Износ' ? (
                                <HealthProgress percent={Number(text.slice(0, -1))} />
                            ) : null}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
