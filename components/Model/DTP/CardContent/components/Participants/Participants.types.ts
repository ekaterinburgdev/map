import { DTPObjectProperties } from 'common/data/dtp/dtp';

export type ParticipantsProps = {
    participants: DTPObjectProperties['participants'];
    vehicles?: DTPObjectProperties['vehicles'];
};

export enum HealthStatusType {
    Dead = 'скончался',
    Injured = 'пострадал',
    NotInjured = 'не пострадал',
}
