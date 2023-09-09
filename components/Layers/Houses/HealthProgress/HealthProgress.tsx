import { useMemo } from 'react';
import Heart from 'components/UI/Icons/Heart';
import { WEAR_TEAR_FILTERS_DATA } from '../Houses.constants';
import styles from './HealthProgress.module.css';

type Props = {
    percent: number;
};

function HealthProgress({ percent }: Props) {
    const healthColor = useMemo(() => WEAR_TEAR_FILTERS_DATA.find(({ from, to }) => percent >= from && percent <= to).color, [percent]);

    return (
        <div
            className={styles.health_progress__track}
        >
            <div
                className={styles.health_progress__thumb}
                style={{
                    backgroundColor: healthColor,
                    width: `${100 - percent}%`,
                }}
            />
            <div
                className={styles.health_progressbar__icon}
                style={{
                    right: `${percent - 6}%`,
                }}
            >
                <Heart color={healthColor} />
            </div>
        </div>
    );
}

export default HealthProgress;
