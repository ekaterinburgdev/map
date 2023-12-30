export const getLatLngFromHash = (): string[] =>
    window.location.hash.split('/')[0].split('-')[1].split('_');

export const setHash = (type: string, id: string): void => {
    window.location.hash = `${type}-${id}`;
};
