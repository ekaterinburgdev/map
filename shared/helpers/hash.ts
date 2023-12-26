export const getLatLngFromHash = (): string[] =>
  window.location.hash.split('/')[0].split('-')[1].split('_');

export const getFilterTypeFromHash = () => window.location.hash.split('/')[1];

export const setHash = (type: string, id: string, activeFilter: string): void => {
  window.location.hash = `${type}-${id}/${activeFilter}`;
};
