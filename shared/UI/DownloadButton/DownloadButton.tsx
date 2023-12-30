import classNames from 'classnames';
import DownloadIcon from 'shared/UI/Icons/DownloadIcon';
import styles from './DownloadButton.module.css';

type Props = {
    type: 'primary' | 'secondary';
    name: string;
    link: string;
};

const COLORS = {
    primary: '#81FF00',
    secondary: '#C8A563',
} as const;

export function DownloadButton({ type, name, link }: Props) {
    return (
        <a
            href={link}
            className={classNames(styles.download_button, styles[type])}
            target="_blank"
            rel="noreferrer"
        >
            <div className={styles.file_name}>
                <DownloadIcon color={COLORS[type]} />
                <p>{name}</p>
            </div>
        </a>
    );
}
