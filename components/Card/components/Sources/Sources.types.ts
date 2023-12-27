import { SOURCES_BY_TYPE } from 'constants/sources';

export type SourcesProps = {
    sources: (keyof typeof SOURCES_BY_TYPE)[];
};
