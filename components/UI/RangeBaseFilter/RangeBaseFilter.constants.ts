import { FilterType } from 'components/UI/Filters/Filters.types';

export const REQUEST_DELAY = 1000;
export const timeoutIds: Partial<Record<FilterType, NodeJS.Timeout>> = {};
