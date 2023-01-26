import { DTPObjectAttributes } from 'common/data/dtp/dtp';

export type ParticipantsProps = {
    participants: DTPObjectAttributes['participants'];
    vehicles?: DTPObjectAttributes['vehicles'];
};

export enum HealthStatusType {
    Dead = 'скончался',
    Injured = 'пострадал',
    NotInjured = 'не пострадал',
}
