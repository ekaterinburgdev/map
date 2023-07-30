import React, { useState } from 'react';
import Image from 'next/image';
import { Button, ButtonType } from 'components/UI/Button/Button';
import { NewModal } from 'components/UI/NewModal/NewModal';
import styles from './RightBotomIcons.module.css';
import githubLogo from './github-color.svg';

export function RightBottomIcons() {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

    return (
        <>
            <div className={styles.rightBottomIcons}>
                <a href="https://github.com/ekaterinburgdev/map">
                    <Image src={githubLogo} alt="github" />
                </a>
                <Button text="О проекте" type={ButtonType.BLACK} onClick={() => setIsAboutModalOpen(true)} />
                <Button text="Фидбек" type={ButtonType.YELLOW} onClick={() => {}} link="https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none" />
            </div>
            <NewModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
        </>
    );
}
