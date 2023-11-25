import styles from './FacadeFilter.module.css';

export function FacadeFilter() {
    return (
        <div className={styles.wrapper}>
            <p>
                Для зданий в первом поясе туристического центра Екатеринбурга разработан специальный
                дизайн-код фасадов. Это нужно для того, чтобы историческая часть города имела
                опрятное и единое оформление. В этом слое показаны дома, которые входят в первый
                пояс. Чтобы посмотреть регламент оформления фасада, кликните на дом, а затем на
                зелёную кнопку скачивания.
            </p>
        </div>
    );
}