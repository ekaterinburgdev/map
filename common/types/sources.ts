export interface SourcesType {
    [key: string]: Source;
}

export interface Source {
    name: string;
    link: string;
    data: string;
}
