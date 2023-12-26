import React from 'react';
import classNames from 'classnames';
import { IconType } from 'shared/UI/Icons/Icons.types';
import { Icon } from 'shared/UI/Icons';
import styles from 'shared/UI/ButtonLink/ButtonLink.module.css';

type TButtonLinkProps = {
  text: string;
  link: string;
  icon?: IconType;
  additionalStyles?: string;
};

export function ButtonLink({ text, link, icon, additionalStyles }: TButtonLinkProps) {
  return (
    <a className={classNames(styles.buttonLink, additionalStyles)} href={link}>
      {icon && <Icon type={icon} color="#9baac3" />}
      {text}
    </a>
  );
}
