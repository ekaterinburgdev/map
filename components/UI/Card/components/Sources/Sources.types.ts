import { SOURCES_BY_TYPE } from './Sources.constants';

export type SourcesProps = {
    sources: (keyof typeof SOURCES_BY_TYPE)[];
};
