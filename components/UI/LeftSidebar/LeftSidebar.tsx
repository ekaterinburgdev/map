import React, { useCallback, useState } from 'react';
import { Welcome } from 'components/UI/Welcome/Welcome';
import { Filters } from 'components/UI/Filters/Filters';
import styles from './LeftSidebar.module.css';

export function LeftSidebar() {
    // TODO Add to Redux after development modal window with project information
    const [isWelcomeClosed, setIsWelcomeClosed] = useState(
        localStorage.getItem('is-welcome-closed') !== null,
    );

    const onClose = useCallback(() => {
        setIsWelcomeClosed(true);
        localStorage.setItem('is-welcome-closed', '');
    }, []);

    return (
        <div className={styles.leftSidebar}>
            {!isWelcomeClosed && <Welcome onClose={onClose} />}
            <Filters />
        </div>
    );
}
