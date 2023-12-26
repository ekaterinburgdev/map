import { MapItemType } from 'types/map-item';
import { designCode } from 'components/Layers/DesignCode/designCode';
import { dtp } from 'components/Layers/DTP/dtp';
import { okn } from 'components/Layers/OKN/okn';

import { lines } from 'components/Layers/Lines/lines';
import { LinesCardContent } from 'components/Layers/Lines/CardContent/CardContent';
import { QuarterCardContent } from 'components/Layers/Quarter/CardContent/CardContent';
import { quarter } from 'components/Layers/Quarter/quarter';
import { DesignCodeCardContent } from './DesignCode/CardContent/CardContent';
import { DTPCardContent } from './DTP/CardContent/CardContent';
import { HousesCardContent } from './Houses/CardContent/CardContent';
import { OKNCardContent } from './OKN/CardContent';

export const CONTENTS_CONFIG = {
  [MapItemType.Houses]: {
    cardContent: HousesCardContent,
    oneItemRequest: () => Promise.resolve(),
  },
  [MapItemType.DesignCode]: {
    cardContent: DesignCodeCardContent,
    oneItemRequest: designCode.getObject,
  },
  [MapItemType.DTP]: {
    cardContent: DTPCardContent,
    oneItemRequest: dtp.getObject,
  },
  [MapItemType.OKN]: {
    cardContent: OKNCardContent,
    oneItemRequest: okn.getObject,
  },
  [MapItemType.RedLines]: {
    cardContent: LinesCardContent,
    oneItemRequest: lines.getObject,
  },
  [MapItemType.PinkLines]: {
    cardContent: LinesCardContent,
    oneItemRequest: lines.getObject,
  },
  [MapItemType.BlueLines]: {
    cardContent: LinesCardContent,
    oneItemRequest: lines.getObject,
  },
  [MapItemType.Quarter]: {
    cardContent: QuarterCardContent,
    oneItemRequest: quarter.getObject,
  },
} as const;
