import React from 'react';
import classNames from 'classnames';
import styles from './Link.module.css';

type TLinkProps = {
  text?: string;
  className?: string;
  href: string;
  children?: React.ReactNode;
};

export function Link({ href, text, className, children }: TLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={classNames(styles.link, className)}>
      {text || children || href}
    </a>
  );
}
