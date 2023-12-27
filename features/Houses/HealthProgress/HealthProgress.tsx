import { useMemo } from 'react';
import BrokenHeart from 'shared/UI/Icons/BrokenHeart';
import Heart from 'shared/UI/Icons/Heart';
import { WEAR_TEAR_FILTERS_DATA } from '../Houses.constants';
import styles from './HealthProgress.module.css';

type Props = {
    percent: number;
    isEmergency: boolean;
};

function HealthProgress({ percent, isEmergency }: Props) {
    const healthColor = useMemo(
        () => WEAR_TEAR_FILTERS_DATA.find(({ from, to }) => percent >= from && percent <= to).color,
        [percent],
    );

    return (
        <div className={styles.health_progress__track}>
            <div
                className={styles.health_progress__thumb}
                style={{
                    backgroundColor: healthColor,
                    width: `${100 - percent}%`,
                }}
            >
                <div className={styles.health_progressbar__icon}>
                    {isEmergency ? (
                        <BrokenHeart color={healthColor} />
                    ) : (
                        <Heart color={healthColor} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default HealthProgress;
