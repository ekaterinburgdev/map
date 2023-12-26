import { LineType } from './lineType';

export const LINES_CONFIG = {
  [LineType.RedLine]: {
    color: '#e31e24',
    description: 'Маршрут по\u00A0историческому центру города',
  },
  [LineType.BlueLine]: {
    color: '#189eda',
    description: 'Маршрут по\u00A0местам, связанным с\u00A0царской семьей',
  },
  [LineType.PurpleLine]: {
    color: '#9747ff',
    description: 'Арт-объекты фестиваля уличного искусства «Стенограффия»',
  },
};
