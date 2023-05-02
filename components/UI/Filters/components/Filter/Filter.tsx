import React, { PropsWithChildren, useCallback, useRef, CSSProperties, useState } from 'react';
import classNames from 'classnames';

import { useMutationObserver } from 'components/helpers/useMutationObserver';

import styles from './Filter.module.css';

export interface FilterProps extends PropsWithChildren {
    isActive: boolean;
}

export function Filter({ children, isActive }: FilterProps) {
    const spoilerRef = useRef<HTMLDivElement>();
    const childrenWrapperRef = useRef<HTMLDivElement>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updateCount, setUpdateCount] = useState<number>(0);

    const getChildrenHeight = useCallback(() => childrenWrapperRef.current?.scrollHeight || 0, []);
    const style = {
        '--children-height': childrenWrapperRef.current ? `${getChildrenHeight()}px` : 'auto',
    } as CSSProperties;

    useMutationObserver(
        childrenWrapperRef,
        (mutationList) => {
            mutationList.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    setUpdateCount((prev) => prev + 1);
                }
            });
        },
        {
            childList: true,
            subtree: false,
        },
    );

    return (
        <div
            ref={spoilerRef}
            className={classNames(styles.filter, { [styles.filter__active]: isActive })}
            style={style}
            aria-hidden={!isActive}
        >
            <div ref={childrenWrapperRef}>{children}</div>
        </div>
    );
}
