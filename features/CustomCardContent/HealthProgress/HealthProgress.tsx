import { Icon, IconType } from 'sloy-ui';
import { defaultSources } from 'state/config';
import styles from './HealthProgress.module.css';

type Props = {
    percent?: number;
    isEmergency: boolean;
};

function HealthProgress({ percent, isEmergency }: Props) {
    if (!percent) return null;

    const healthColor = defaultSources
        .find((s) => s.id === 'osmBuilding')
        ?.properties?.find((p) => p.id === 'building:health')
        ?.range.find(({ from, to }) => percent >= from && percent <= to).color;

    if (!healthColor) {
        return null;
    }

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
                        <Icon type={IconType.BrokenHeart} color={healthColor} />
                    ) : (
                        <Icon type={IconType.Heart} color={healthColor} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default HealthProgress;
