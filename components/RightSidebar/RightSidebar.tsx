import React, { ReactNode } from 'react';
import styles from './RightSidebar.module.css';

export function RightSidebar({ children }: { children: ReactNode }) {
  return <div className={styles.rightSidebar}>{children}</div>;
}
