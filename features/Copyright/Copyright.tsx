import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { activeFilterSelector } from 'state/features/selectors';
import { MapContext } from 'features/Map/providers/MapProvider';
import { FilterConfig } from 'types/Filters.types';
import styles from './Copyright.module.css';

export function Copyright({ filters }: { filters: FilterConfig }) {
  const { loading } = useContext(MapContext);
  const activeFilter = useSelector(activeFilterSelector);
  const copyright = filters[activeFilter]?.source;

  return (
    <div className={styles.copyright} hidden={loading}>
      <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">
        OpenStreetMap
      </a>
      {copyright?.map((elem) => (
        <a key={elem.link} href={elem.link} target="_blank" rel="noreferrer">
          {elem.name}
        </a>
      ))}
    </div>
  );
}
