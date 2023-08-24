import { LineType } from '../lineType';
import { LinesState, LinesAction } from './LinesFilter.types';

export function linesReducer(state: LinesState, action: LinesAction) {
    switch (action.type) {
        case 'toggle':
            return { ...state, [action.lineType]: !state[action.lineType] };
        default:
            return state;
    }
}

export const linesInitalState = Object.values(LineType).reduce((acc, type) => {
    acc[type] = true;

    return acc;
}, {} as LinesState);
