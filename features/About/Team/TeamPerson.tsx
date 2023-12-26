import React from 'react';
import classNames from 'classnames/bind';
import styles from './TeamPerson.module.css';
import { ITeamPerson } from './types';

const cx = classNames.bind(styles);

function Person({ name, role, photo }: ITeamPerson) {
  return (
    <figure className={cx('team-person__inner')}>
      {photo.length > 0 && (
        <div className={cx('team-person__photo')}>
          <img src={photo} width={300} height={300} alt="" loading="lazy" />
        </div>
      )}
      <figcaption className={cx('team-person__caption')}>
        {name && (
          <div className={cx('team-person__name')}>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </div>
        )}
        {/* eslint-disable-next-line react/no-danger */}
        {role && (
          <div dangerouslySetInnerHTML={{ __html: role }} className={cx('team-person__role')} />
        )}
      </figcaption>
    </figure>
  );
}

export default function TeamPerson(person: ITeamPerson) {
  const { link } = person;
  if (link) {
    return (
      <a
        className={cx('team-person', 'team-person_link')}
        href={link}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Person {...person} />
      </a>
    );
  }

  return (
    <div className={cx('team-person')}>
      <Person {...person} />
    </div>
  );
}
