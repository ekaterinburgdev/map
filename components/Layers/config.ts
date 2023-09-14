import { MapItemType } from 'types/map-item';
import { designCode } from 'components/Layers/DesignCode/designCode';
import { dtp } from 'components/Layers/DTP/dtp';
import { okn } from 'components/Layers/OKN/okn';

import { lines } from 'components/Layers/Lines/lines';
import { LinesCardContent } from 'components/Layers/Lines/CardContent/CardContent';
import { DesignCodeCardContent } from './DesignCode/CardContent/CardContent';
import { DTPCardContent } from './DTP/CardContent/CardContent';
import { HousesCardContent } from './Houses/CardContent/CardContent';
import { OKNCardContent } from './OKN/CardContent';

export const MODEL_CONFIG = {
    [MapItemType.Houses]: {
        cardContent: HousesCardContent,
        requests: { oneItemRequest: () => Promise.resolve() },
    },
    [MapItemType.DesignCode]: {
        cardContent: DesignCodeCardContent,
        requests: { oneItemRequest: designCode.getObject },
    },
    [MapItemType.DTP]: {
        cardContent: DTPCardContent,
        requests: { oneItemRequest: dtp.getObject },
    },
    [MapItemType.OKN]: {
        cardContent: OKNCardContent,
        requests: { oneItemRequest: okn.getObject },
    },
    [MapItemType.RedLines]: {
        cardContent: LinesCardContent,
        requests: { oneItemRequest: lines.getObject },
    },
    [MapItemType.PinkLines]: {
        cardContent: LinesCardContent,
        requests: { oneItemRequest: lines.getObject },
    },
    [MapItemType.BlueLines]: {
        cardContent: LinesCardContent,
        requests: { oneItemRequest: lines.getObject },
    },
} as const;
