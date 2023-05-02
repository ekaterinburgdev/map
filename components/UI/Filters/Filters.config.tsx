import React from 'react';

import { HouseAgeFilter } from 'components/Model/Houses/Filter/Age/HouseAgeFilter';
import { HouseFloorFilter } from 'components/Model/Houses/Filter/Floor/HouseFloorFilter';

import { OknFilter } from 'components/Model/Houses/Filter/Okn/OknFilter';
import { FilterConfig, FilterType } from './Filters.types';

function UnderConstructionNotice() {
    return (
        <a
            href="https://github.com/ekaterinburgdev/map/issues/16"
            target="_blank"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5em',
                margin: '-5px 0',
                color: 'rgba(255,255,255,.65)',
                fontSize: '.95em',
                textDecoration: 'underline',
            }}
            rel="noreferrer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 520 520"
            >
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M260 0C116.35 0 0 116.35 0 260c0 115.05 74.425 212.225 177.775 246.675 13 2.275 17.875-5.525 17.875-12.35 0-6.175-.325-26.65-.325-48.425C130 457.925 113.1 429.975 107.9 415.35c-2.925-7.475-15.6-30.55-26.65-36.725-9.1-4.875-22.1-16.9-.325-17.225 20.475-.325 35.1 18.85 39.975 26.65 23.4 39.325 60.775 28.275 75.725 21.45 2.275-16.9 9.1-28.275 16.575-34.775-57.85-6.5-118.3-28.925-118.3-128.375 0-28.275 10.075-51.675 26.65-69.875-2.6-6.5-11.7-33.15 2.6-68.9 0 0 21.775-6.825 71.5 26.65 20.8-5.85 42.9-8.775 65-8.775s44.2 2.925 65 8.775c49.725-33.8 71.5-26.65 71.5-26.65 14.3 35.75 5.2 62.4 2.6 68.9 16.575 18.2 26.65 41.275 26.65 69.875 0 99.775-60.775 121.875-118.625 128.375 9.425 8.125 17.55 23.725 17.55 48.1 0 34.775-.325 62.725-.325 71.5 0 6.825 4.875 14.95 17.875 12.35A260.426 260.426 0 00520 260C520 116.35 403.65 0 260 0z"
                    clipRule="evenodd"
                />
            </svg>
            Фильтр в разработке
        </a>
    );
}

export const FILTERS_CONFIG: FilterConfig = {
    [FilterType.HouseAge]: {
        title: 'Возраст домов',
        component: HouseAgeFilter,
    },
    [FilterType.HouseFloor]: {
        title: 'Этажность домов',
        component: HouseFloorFilter,
    },
    [FilterType.OKN]: {
        title: 'Объекты культурного наследия',
        component: () => (
            <>
                <UnderConstructionNotice />
                <br />
                <OknFilter />
            </>
        ),
    },
    [FilterType.DesignCode]: {
        title: '«Дизайн-код Екатеринбурга»',
        component: UnderConstructionNotice,
    },
    [FilterType.DTP]: {
        title: 'Дорожно-транспортные происшествия',
        component: UnderConstructionNotice,
    },
    [FilterType.Line]: {
        title: 'Цветные линии Екатеринбурга',
        component: UnderConstructionNotice,
    },
};
