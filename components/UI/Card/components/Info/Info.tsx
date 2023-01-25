import React from 'react';

import { InfoProps } from './Info.types';

import styles from './Info.module.css';

export function Info({ infos, nameColor, textColor }: InfoProps) {
    return (
        <div className={styles.info}>
            {infos.map(({ name, text }) => (
                <div>
                    {name && (
                        <div className={styles.info__name} style={{ color: nameColor }}>
                            {name}
                        </div>
                    )}
                    {text && (
                        <div className={styles.info__text} style={{ color: textColor }}>
                            {text}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
