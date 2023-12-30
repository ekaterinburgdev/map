import React from 'react';

import styles from './Section.module.css';

export function Section({ children }: React.PropsWithChildren) {
    return <div className={styles.block}>{children}</div>;
}
