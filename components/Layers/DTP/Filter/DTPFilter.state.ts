import { DtpParticipantType } from '../dtpParticipantType';
import { DtpSeverityType } from '../dtpSeverityType';
import {
  DTPParticipantsAction,
  DTPParticipantsState,
  DTPSeverityAction,
  DTPSeverityState,
} from './DTPFilter.types';

export function dtpSeverityReducer(state: DTPSeverityState, action: DTPSeverityAction) {
  switch (action.type) {
    case 'toggle':
      return { ...state, [action.severityType]: !state[action.severityType] };
    default:
      return state;
  }
}

export const dtpSeverityInitalState = Object.values(DtpSeverityType).reduce((acc, type) => {
  acc[type] = true;

  return acc;
}, {} as DTPSeverityState);

export function dtpParticipantReducer(state: DTPParticipantsState, action: DTPParticipantsAction) {
  switch (action.type) {
    case 'toggle':
      return { ...state, [action.participantType]: !state[action.participantType] };
    default:
      return state;
  }
}

export const dtpParticipantInitalState = Object.values(DtpParticipantType).reduce((acc, type) => {
  acc[type] = true;

  return acc;
}, {} as DTPParticipantsState);
