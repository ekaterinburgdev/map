import DownloadButton from '../DownloadButton/DownloadButton';
import styles from './Facade.module.css';

type Props = {
    facade: {
        name: string;
        link: string;
    };
};

export default function Facade({ facade }: Props) {
    return (
        <div className={styles.facade}>
            <h3 className={styles.facade_title}>Дизайн-код фасада</h3>
            <DownloadButton type="primary" name={facade.name} link={facade.link} />
        </div>
    );
}
