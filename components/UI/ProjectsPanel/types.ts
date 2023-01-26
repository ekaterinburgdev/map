export interface Theme {
    background: string;
    color: string;
}

export interface Project {
    id: string;
    fullTitle: string;
    shortTitle: string;
    link: string;
    logoDark: string;
    logoLight: string;
    active?: boolean;
}
