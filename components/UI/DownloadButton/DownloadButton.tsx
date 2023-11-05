import classNames from 'classnames';
import DownloadFacade from '../Icons/DownloadFacade';
import styles from './DownloadFacade.module.css';

type Props = {
    type: 'green' | 'brown';
};

const COLORS = {
    green: '#81FF00',
    brown: '#C8A563',
} as const;

function DownloadButton({ type }: Props) {
    return (
        <a href="ссылка" className={classNames(styles.download_button, styles[type])}>
            <div className={styles.file_name}>
                <DownloadFacade color={COLORS[type]} />
                <p>Название файла.pdf</p>
            </div>
            <div className={styles.file_size}>19,6 МБ</div>
        </a>
    );
}

export default DownloadButton;
