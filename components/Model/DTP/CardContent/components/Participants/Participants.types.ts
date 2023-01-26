import { DTPObjectAttributes } from 'common/data/dtp/dtp';

export type ParticipantsProps = {
    participants: DTPObjectAttributes['participants'];
    participantsCount: number;
    injuredCount: number;
    deadCount: number;
    vehicles?: DTPObjectAttributes['vehicles'];
};

export enum HealthStatusType {
    Dead = 'скончался',
    Injured = 'пострадал',
    NotInjured = 'не пострадал',
}
