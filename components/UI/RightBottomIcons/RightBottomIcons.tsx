import React from 'react';
import { Button, ButtonType } from 'components/UI/Button/Button';
import styles from './RightBotomIcons.module.css';

export function RightBottomIcons() {
    return (
        <div className={styles.rightBottomIcons}>
            <Button text="О проекте" type={ButtonType.BLACK} onClick={() => {}} />
            <Button text="Фидбек" type={ButtonType.YELLOW} onClick={() => {}} />
        </div>
    );
}
