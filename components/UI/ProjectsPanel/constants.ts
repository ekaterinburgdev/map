import designIcon from './icons/design.svg';
import devIconLight from './icons/dev_light.svg';
import mapIconLight from './icons/map_light.svg';
import guidesIconLight from './icons/guides_light.svg';
import transportIconLight from './icons/transport_light.svg';
import devIconDark from './icons/dev_dark.svg';
import mapIconDark from './icons/map_dark.svg';
import guidesIconDark from './icons/guides_dark.svg';
import transportIconDark from './icons/transport_dark.svg';

export const PROJECT_MAP = {
    id: 'map',
    fullTitle: 'Карта \n Екатеринбурга',
    shortTitle: 'Карта',
    link: 'https://map.ekaterinburg.io/',
    logoDark: mapIconDark.src,
    logoLight: mapIconLight.src,
};
export const PROJECT_GUIDES = {
    id: 'guides',
    fullTitle: 'Руководства \n Екатеринбурга',
    shortTitle: 'Руководства',
    link: 'https://guides.ekaterinburg.io/',
    logoDark: guidesIconDark.src,
    logoLight: guidesIconLight.src,
};
export const PROJECT_TRANSPORT = {
    id: 'transport',
    fullTitle: 'Транспорт \n Екатеринбурга',
    shortTitle: 'Транспорт',
    link: 'https://transport.ekaterinburg.io/',
    logoDark: transportIconDark.src,
    logoLight: transportIconLight.src,
};
export const PROJECT_DESIGN = {
    id: 'design',
    fullTitle: 'Дизайн-код \n Екатеринбурга',
    shortTitle: 'Дизайн-код',
    link: 'https://ekaterinburg.design/',
    logoDark: designIcon.src,
    logoLight: designIcon.src,
};
export const PROJECT_DEV = {
    id: 'dev',
    fullTitle: 'ekaterinburg.dev',
    shortTitle: 'ekaterinburg.dev',
    link: 'https://ekaterinburg.dev/',
    logoDark: devIconDark.src,
    logoLight: devIconLight.src,
};

export const ALL_PROJECTS = [
    PROJECT_MAP,
    PROJECT_GUIDES,
    PROJECT_TRANSPORT,
    PROJECT_DESIGN,
    PROJECT_DEV,
];
