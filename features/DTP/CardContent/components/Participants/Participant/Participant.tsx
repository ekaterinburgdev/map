import React, { useMemo } from 'react';

import { DTPParticipant } from 'features/DTP/dtp';

import { Info } from 'components/Card/components/Info/Info';
import { Label } from 'shared/UI/Label/Label';
import { getYearNameByValue } from 'shared/helpers/getYearNameByValue';
import { HealthStatusType } from '../Participants.types';
import styles from './Participant.module.css';

export type ParticipantProps = {
  participant: DTPParticipant;
  noHealthStatus?: boolean;
};

export function healthStatusToType(healthStatus: string) {
  const lowerCaseHealthStatus = healthStatus.toLowerCase();

  if (lowerCaseHealthStatus.includes(HealthStatusType.Dead)) {
    return HealthStatusType.Dead;
  }

  if (lowerCaseHealthStatus.includes(HealthStatusType.NotInjured)) {
    return HealthStatusType.NotInjured;
  }

  return HealthStatusType.Injured;
}

export const HEALTH_STATUS_COLOR = {
  [HealthStatusType.Dead]: {
    color: '#e63223',
    backgroundColor: 'rgba(230, 50, 35, 0.24)',
  },
  [HealthStatusType.Injured]: {
    color: '#ff640f',
    backgroundColor: 'rgba(255, 200, 0, 0.24)',
  },
  [HealthStatusType.NotInjured]: {
    color: '#fff',
    backgroundColor: 'rgba(85, 100, 125, 0.24)',
  },
};

export const GENDER_TO_NOUN_GENDER = {
  Женский: 'Женщина 👩',
  Мужской: 'Мужчина 👨',
};

export function Participant({ participant, noHealthStatus }: ParticipantProps) {
  const healthStatusType = useMemo(
    () => healthStatusToType(participant.health_status),
    [participant.health_status],
  );

  const violations = useMemo(() => {
    if (!participant.violations?.length) {
      return null;
    }

    const [firstViolation, ...restViolations] = participant.violations;
    const joinedViolations = [
      firstViolation,
      ...restViolations.map((violation) => violation.toLowerCase()),
    ].join(', ');

    return joinedViolations;
  }, [participant.violations]);

  const mainInfo = useMemo(() => {
    const result = [
      {
        name: participant.role,
        text: GENDER_TO_NOUN_GENDER[participant.gender],
      },
    ];

    if (participant.years_of_driving_experience) {
      result.push({
        name: 'Стаж',
        text: `${participant.years_of_driving_experience} ${getYearNameByValue(
          participant.years_of_driving_experience,
        )}`,
      });
    }

    return result;
  }, [participant.role, participant.gender, participant.years_of_driving_experience]);

  return (
    <>
      <div className={styles.participant__mainInfo}>
        <Info rowDirection infos={mainInfo} nameColor="#9baac3" />
        {!noHealthStatus && (
          <div>
            <Label
              color={HEALTH_STATUS_COLOR[healthStatusType].color}
              backgroundColor={HEALTH_STATUS_COLOR[healthStatusType].backgroundColor}
            >
              {/* TODO: make correct gender word ending */}
              {healthStatusType}
            </Label>
          </div>
        )}
      </div>
      {Boolean(violations) && <p className={styles.participant__violations}>{violations}</p>}
    </>
  );
}
