import { DtpParticipantType } from 'common/data/dtp/dtpParticipantType';
import { DtpSeverityType } from 'common/data/dtp/dtpSeverityType';

export interface DTPSeverityAction {
    type: 'toggle';
    severityType: DtpSeverityType;
}
export interface DTPParticipantsAction {
    type: 'toggle';
    participantType: DtpParticipantType;
}

export type DTPSeverityState = Record<DtpSeverityType, boolean>;
export type DTPParticipantsState = Record<DtpParticipantType, boolean>;
