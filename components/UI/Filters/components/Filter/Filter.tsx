import React, { PropsWithChildren, useRef } from 'react';
import classNames from 'classnames';

import styles from './Filter.module.css';

export interface FilterProps extends PropsWithChildren {
    isActive: boolean;
}

export function Filter({ children, isActive }: FilterProps) {
    const spoilerRef = useRef<HTMLDivElement>();

    return (
        <div
            ref={spoilerRef}
            className={classNames(styles.filter, { [styles.filter_active]: isActive })}
            aria-hidden={!isActive}
        >
            {isActive && children}
        </div>
    );
}
