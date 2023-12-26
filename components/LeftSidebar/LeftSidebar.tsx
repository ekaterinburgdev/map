import React, { ReactNode } from 'react';
import styles from './LeftSidebar.module.css';

export function LeftSidebar({ children }: { children: ReactNode }) {
  return <div className={styles.leftSidebar}>{children}</div>;
}
