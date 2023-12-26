import { LineType } from '../lineType';

export interface LinesAction {
  type: 'toggle';
  lineType: LineType;
}

export type LinesState = Record<LineType, boolean>;
