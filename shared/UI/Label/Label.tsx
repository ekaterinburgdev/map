import React, { useMemo } from 'react';
import classNames from 'classnames';

import { Icon } from 'shared/UI/Icons';
import styles from './Label.module.css';
import { LabelProps } from './Label.types';

export function Label({
  color,
  backgroundColor,
  icon,
  right,
  rightColor,
  onClick,
  children,
}: React.PropsWithChildren<LabelProps>) {
  const style = useMemo(
    () => ({
      color,
      backgroundColor,
    }),
    [color, backgroundColor],
  );

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: color,
      opacity: '0.3',
    }),
    [color],
  );

  const rightStyle = useMemo(
    () => ({
      color: rightColor,
    }),
    [rightColor],
  );

  return (
    <div className={styles.label}>
      <div
        className={classNames(styles.label__wrapper, {
          [styles.label__wrapper_clickable]: Boolean(onClick),
        })}
        style={style}
        onClick={onClick}
      >
        {children}
        {icon && <Icon type={icon} color={color} />}
        {right && <span style={rightStyle}>{right}</span>}
      </div>
      {!backgroundColor && <span className={styles.label__background} style={backgroundStyle} />}
    </div>
  );
}
