import { ContentConfig, MapItemType } from 'types/Content.types';
import { designCode } from 'features/DesignCode/designCode';
import { dtp } from 'features/DTP/dtp';
import { okn } from 'features/OKN/okn';
import { lines } from 'features/Lines/lines';
import { LinesCardContent } from 'features/Lines/CardContent/CardContent';
import { QuarterCardContent } from 'features/Quarter/CardContent/CardContent';
import { quarter } from 'features/Quarter/quarter';
import { DesignCodeCardContent } from 'features/DesignCode/CardContent/CardContent';
import { DTPCardContent } from 'features/DTP/CardContent/CardContent';
import { HousesCardContent } from 'features/Buildings/CardContent/CardContent';
import { OKNCardContent } from 'features/OKN/CardContent';

export const CONTENTS_CONFIG: ContentConfig = {
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
