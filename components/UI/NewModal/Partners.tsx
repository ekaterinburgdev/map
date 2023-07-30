import React from 'react';
import Image from 'next/image';
import stolicaUrala from 'components/UI/NewModal/stolica-urala.svg';
import atom from 'components/UI/NewModal/atom.svg';
import madeInUral from 'components/UI/NewModal/made-in-ural.svg';
import unknownOrg from 'components/UI/NewModal/unknown-org.svg';
import cityAdministration from 'components/UI/NewModal/city-administration.svg';
import styles from './NewModal.module.css';

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
