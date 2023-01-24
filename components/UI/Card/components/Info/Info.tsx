import React from 'react';

import styles from './Info.module.css';

interface Props {
    infos: {
        name?: string;
        text?: string;
    }[];
    nameColor?: string;
    textColor?: string;
}

export function Info({ infos, nameColor, textColor }: Props) {
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
