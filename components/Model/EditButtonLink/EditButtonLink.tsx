import React from 'react';
import { ButtonLink } from 'components/UI/ButtonLink/ButtonLink';
import { IconType } from 'components/UI/Icons/Icons.types';
import styles from './EditButtonLink.module.css';

const link = 'https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none';

export function EditButtonLink() {
    return (
        <ButtonLink text="Дать фидбэк сервису" link={link} icon={IconType.Edit} additionalStyles={styles.editButtonLink} />
    );
}
