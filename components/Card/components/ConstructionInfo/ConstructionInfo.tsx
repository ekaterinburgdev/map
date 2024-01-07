import React, { useMemo } from 'react';
import { getYearNameByValue } from 'shared/helpers/getYearNameByValue';
import { Info } from 'components/Card/components/Info/Info';

const YEAR_RE = /\d{4}/;

type ConstructionInfoProps = {
    date: string;
};

export function ConstructionInfo({ date }: ConstructionInfoProps) {
    const constructionDateInfo = useMemo(() => {
        const result = [
            {
                name: 'Когда построили',
                text: date,
            },
        ];

        const constructionYearMatch = date.match(YEAR_RE);

        if (constructionYearMatch) {
            const constructionYear = Number(constructionYearMatch[0]);
            const age = new Date().getFullYear() - Number(constructionYear);

            result.push({
                name: 'Возраст здания',
                text: `${String(age)} ${getYearNameByValue(age)}`,
            });
        }

        return result;
    }, [date]);

    return (
        <Info infos={constructionDateInfo} nameColor="rgba(155, 170, 195, 0.8)" textColor="#fff" />
    );
}