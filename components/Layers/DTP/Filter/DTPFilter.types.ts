import { DtpParticipantType } from '../dtpParticipantType';
import { DtpSeverityType } from '../dtpSeverityType';

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
