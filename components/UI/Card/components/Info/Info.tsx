import classNames from 'classnames';

import { InfoProps } from './Info.types';

import styles from './Info.module.css';

export function Info({ infos, nameColor, textColor, rowDirection }: InfoProps) {
    return (
        <div
            className={classNames(styles.info, {
                [styles.info_row]: rowDirection,
            })}
        >
            {infos.map(({ name, text, content }) => (
                <div key={name}>
                    {name && (
                        <div className={styles.info__name} style={{ color: nameColor }}>
                            {name}
                        </div>
                    )}
                    {text && (
                        <div className={styles.info__text} style={{ color: textColor }}>
                            <span>{text}</span>
                            {content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
