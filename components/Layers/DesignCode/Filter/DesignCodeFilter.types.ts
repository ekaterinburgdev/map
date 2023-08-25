import { DesignCodeItemType } from '../designCodeObject';

export type DesignCodeFilterState = Record<DesignCodeItemType, boolean>;
export interface DesignCodeFilterAction {
    type: 'toggle';
    designCodeItemType: DesignCodeItemType;
}
