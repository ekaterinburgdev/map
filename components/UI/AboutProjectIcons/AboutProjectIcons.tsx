import React, { useContext } from 'react';
import Image from 'next/image';
import styles from 'components/UI/AboutProjectIcons/AboutProjectIcons.module.css';
import { Button, ButtonSize, ButtonType } from 'components/UI/Button/Button';
import { AboutProjectContext } from 'components/providers/AboutProjectProvider';
import githubLogo from './github-icon.svg';

export function AboutProjectIcons() {
    const { open } = useContext(AboutProjectContext);

    return (
        <>
            <div className={styles.aboutProjectIcons}>
                <a href="https://github.com/ekaterinburgdev/map" target="_blank" rel="noreferrer">
                    <Image src={githubLogo} alt="github" />
                </a>
                <Button text="О проекте" type={ButtonType.BLACK} size={ButtonSize.SMALL} onClick={open} />
                <Button text="Фидбек" type={ButtonType.YELLOW} size={ButtonSize.SMALL} onClick={() => {}} link="https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none" />
            </div>
        </>
    );
}
