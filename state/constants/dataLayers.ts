import { State } from 'common/types/state';
import { FilterType } from 'components/UI/Filters/Filters.types';

export const initialState: State['dataLayer'] = {
    activeFilter: Object.values(FilterType)[0],
    activeFilterParams: null,
};
