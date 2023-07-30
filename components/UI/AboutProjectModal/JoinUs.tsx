import React from 'react';
import styles from 'components/UI/AboutProjectModal/AboutProjectModal.module.css';
import { Button, ButtonType } from 'components/UI/Button/Button';

export function JoinUs() {
    return (
        <div className={styles.joinUs}>
            <h4 className={styles.h4}>Присоединяйся к нам</h4>
            <Button text="Написать" type={ButtonType.YELLOW} onClick={() => {}} link="https://tally.so#tally-open=wL9Vd1&tally-width=650&tally-overlay=1&tally-emoji-animation=none" />
        </div>
    );
}
