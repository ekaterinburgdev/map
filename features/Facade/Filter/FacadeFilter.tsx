import { Link } from 'shared/UI/Link/Link';

import styles from './FacadeFilter.module.css';

export function FacadeFilter() {
    return (
        <div className={styles.wrapper}>
            <p>
                Для зданий в&nbsp;первом поясе туристического центра Екатеринбурга разработан
                специальный дизайн-код фасадов. Это нужно для того, чтобы историческая часть города
                имела опрятное и&nbsp;единое оформление. В&nbsp;этом слое показаны дома, которые
                входят в&nbsp;первый пояс. Чтобы посмотреть регламент оформления фасада, кликните
                на&nbsp;дом, а&nbsp;затем на&nbsp;зелёную кнопку скачивания.
            </p>
            <p>
                <Link
                    href="https://guides.ekaterinburg.city/city-centre-design-code/general-provisions"
                    text="Стандарт дизайн-кода фасадов в туристском центре"
                />
            </p>
        </div>
    );
}
