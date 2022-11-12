const corsWrapperLink = 'https://allorigins.hexlet.app/raw?disableCache=true&url=';

export function getCorsWrapper(link: string) {
    return `${corsWrapperLink}${encodeURIComponent(link)}`;
}
