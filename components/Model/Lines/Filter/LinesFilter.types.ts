import { LineType } from 'common/data/lines/lineType';

export interface LinesAction {
    type: 'toggle';
    lineType: LineType;
}

export type LinesState = Record<LineType, boolean>;
