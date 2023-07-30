import React from 'react';
import Image from 'next/image';
import stolicaUrala from 'components/UI/AboutProjectModal/svg/tolica-urala.svg';
import cityAdministration from 'components/UI/AboutProjectModal/svf/city-administration.svg';
import styles from 'components/UI/NewModal/AboutProjectModal.module.css';
import madeInUral from 'components/UI/AboutProjectModal/svg/made-in-ural.svg';
import unknownOrg from 'components/UI/AboutProjectModal/svg/unknown-org.svg';
import atom from 'components/UI/AboutProjectModal/svg/atom.svg';

export function Partners() {
    return (
        <div className={styles.partners}>
            <h4 className={styles.h4}>Партнёры</h4>
            <div className={styles.partnersIcons}>
                <Image src={cityAdministration} alt="Администрация города" />
                <Image src={stolicaUrala} alt="Столица Урала" />
                <Image src={atom} alt="Атом" />
                <Image src={madeInUral} alt="Made in Ural" />
                <Image src={unknownOrg} alt="logo4" />
            </div>
        </div>
    );
}
