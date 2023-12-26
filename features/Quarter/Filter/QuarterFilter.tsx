import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from 'state/features/dataLayers';
import { FilterType } from 'types/Filters.types';
import { Link } from 'shared/UI/Link/Link';
import styles from './QuarterFilter.module.css';

export function QuarterFilter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFilter({
        activeFilter: FilterType.Quarter,
        activeFilterParams: {},
      }),
    );
  });

  return (
    <div className={styles.wrapper}>
      <p>
        Квартальный 🙋 — это человек, который следит за&nbsp;порядком на придомовых территориях,
        детских площадках, парковках, мусорках, объектах торговли и&nbsp;т. д.
      </p>
      <p>На что можно пожаловаться квартальному:</p>
      <ul>
        <li>общие вопросы благоустройства;</li>
        <li>незаконная торговля, парковки и постройки;</li>
        <li>вывески и незаконная реклама;</li>
        <li>самовольные ограничения;</li>
        <li>сломанные детские площадки.</li>
      </ul>
      <p>
        <Link href="https://екатеринбург.рф/справка/квартальные/" text="Подробнее о квартальных" />
      </p>
    </div>
  );
}
