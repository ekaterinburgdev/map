import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Button, ButtonSize, ButtonType } from 'sloy-ui';
import { AboutProjectModal } from '../AboutProjectModal';
import styles from './AboutProjectIcons.module.css';
import githubLogo from './github-icon.svg';

export function AboutProjectIcons() {
    const [isOpened, setIsOpened] = useState(false);

    const open = useCallback(() => setIsOpened(true), []);
    const close = useCallback(() => setIsOpened(false), []);

    return (
        <div className={styles.aboutProjectIcons}>
            <a
                target="_blank"
                className={styles.aboutProjectIcons__gh}
                href="https://github.com/ekaterinburgdev/map"
            >
                <Image width={36} height={36} src={githubLogo} alt="github" />
            </a>
            <Button type={ButtonType.CONTRAST} size={ButtonSize.MEDIUM} onClick={open} rounded>
                О проекте
            </Button>
            <Button
                type={ButtonType.ACCENT}
                size={ButtonSize.MEDIUM}
                rounded
                href="mailto:mail@ekaterinburg.design"
            >
                Фидбек
            </Button>
            <AboutProjectModal isOpened={isOpened} close={close} />
        </div>
    );
}
