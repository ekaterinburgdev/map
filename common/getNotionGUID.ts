export const getNotionGUID = (url: string): string => (url.includes('notion-static.com')
    ? url.match(/secure.notion-static.com\/(.*)\//)[1]
    : '');
