import React, { PropsWithChildren, useCallback, useRef, CSSProperties } from 'react';
import classNames from 'classnames';

import styles from './Filter.module.css';

export interface FilterProps extends PropsWithChildren {
    isOpen: boolean;
}

export function Filter({ children, isOpen }: FilterProps) {
    const spoilerRef = useRef<HTMLDivElement>();
    const childrenWrapperRef = useRef<HTMLDivElement>();

    const getChildrenHeight = useCallback(() => childrenWrapperRef.current?.scrollHeight || 0, []);
    const style = {
        '--children-height': `${getChildrenHeight()}px`,
    } as CSSProperties;

    return (
        <div
            ref={spoilerRef}
            className={classNames(styles.filter, { [styles.filter__open]: isOpen })}
            style={style}
        >
            <div ref={childrenWrapperRef}>{children}</div>
        </div>
    );
}
