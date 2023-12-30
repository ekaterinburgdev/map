import React from 'react';
import { Link } from 'shared/UI/Link/Link';
import { SourceInfo } from 'types/Sources.types';
import styles from './Sources.module.css';

export function Sources({ sources }: { sources: SourceInfo[] }) {
    return (
        <div className={styles.sources}>
            <h3 className={styles.sources__title}>Источники</h3>
            <ul className={styles.sources__list}>
                {sources.map(({ link, name, data }) => {
                    return (
                        <li key={link} className={styles.sources__listItem}>
                            <Link href={data || link} text={name} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
