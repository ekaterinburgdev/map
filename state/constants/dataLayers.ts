import { State } from 'common/types/state';
import { FilterType } from 'components/UI/Filters/Filters.types';

export const initialState: State['dataLayer'] = {
    activeFilter: Object.values(FilterType)[6],
    activeFilterParams: null,
};
