import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import teamMock from './team.json';
import TeamPerson from './TeamPerson';
import styles from './TeamGrid.module.css';
import { ITeam } from './types';

const cx = classNames.bind(styles);

export function TeamGrid() {
    const [team, setTeam] = useState<ITeam>([]);

    useEffect(() => {
        Promise.resolve(teamMock as ITeam).then(setTeam);
    }, []);

    if (team.length === 0) {
        return null;
    }

    return (
        <ul className={cx('team-grid')}>
            {team.map((person) => (
                <li className={cx('team-grid__item')} key={person.name}>
                    <TeamPerson {...person} />
                </li>
            ))}
        </ul>
    );
}
