import { SOUCES_BY_TYPE } from './Sources.constants';

export type SourcesProps = {
    sources: (keyof typeof SOUCES_BY_TYPE)[];
};
