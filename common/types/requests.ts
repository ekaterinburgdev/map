export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}

export type FetchOptions = {
    method?: HttpMethod;
    dataField: string;
};
