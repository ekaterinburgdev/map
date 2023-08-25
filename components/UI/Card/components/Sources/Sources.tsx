import React from 'react';

import { SOURCES_BY_TYPE } from 'constants/sources';
import { SourcesProps } from './Sources.types';

import styles from './Sources.module.css';

export function Sources({ sources }: SourcesProps) {
    return (
        <div className={styles.sources}>
            <h3 className={styles.sources__title}>Источники</h3>
            <ul className={styles.sources__list}>
                {sources.map((source) => {
                    const { link, name, data } = SOURCES_BY_TYPE[source];

                    return (
                        <li key={link} className={styles.sources__listItem}>
                            <a href={data || link} target="_blank" rel="noreferrer">
                                {name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
