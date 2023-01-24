import React from 'react';

import styles from './Block.module.css';

export function Block({ children }: React.PropsWithChildren) {
    return <div className={styles.block}>{children}</div>;
}
