import { FC, useEffect, useState } from 'react'
import { WEAR_TEAR_FILTERS_DATA } from '../Houses.constants'
import styles from './HealthProgress.module.css'

type Props = {
    percent: number;
};

const HealthProgress: FC<Props> = ({ percent }: Props) => {
    const [color, setColor] = useState<string | null>(null);

    useEffect(() => {
        WEAR_TEAR_FILTERS_DATA.map(({ from, to, color }) => {
            if (percent >= from && percent <= to) setColor(color);
        });
    }, [percent]);

    return (
        <div
            className={styles.health__progress__container}
            style={{
                gridTemplateColumns: `${100 - percent}fr ${percent}fr`,
            }}
        >
            <div
                className={styles.completed}
                style={{
                    background: color,
                }}
            ></div>
            <div className={styles.not__completed}></div>
            {/* <div
                className={styles.health__progressbar__icon}
                style={{
                    left: `${97 - percent}%`,
                }}
            >
                <AiFillHeart
                    size="30px"
                    style={{ stroke: '#1E2841', strokeWidth: '100', fill: color }}
                />
            </div> */}
            {/* <img src='/health-progress-heart.svg' alt="" style={{
                fill: color,
            }} /> */}
        </div>
    );
};

export default HealthProgress;
