import { MapItemType } from 'common/types/map-item';
import { dtp } from 'common/data/dtp/dtp';
import { okn } from 'common/data/okn/okn';
import { houseBase } from 'common/data/base/houseBase';
import { designCode } from 'common/data/designCode/designCode';

import { OKNCardContent } from 'components/Model/OKN/CardContent';
import { HousesCardContent } from 'components/Model/Houses/CardContent/CardContent';
import { DTPCardContent } from 'components/Model/DTP/CardContent/CardContent';
import { DesignCodeCardContent } from 'components/Model/DesignCode/CardContent/CardContent';

export const CONTENT_BY_TYPE = {
    [MapItemType.OKN]: OKNCardContent,
    [MapItemType.Houses]: HousesCardContent,
    [MapItemType.DTP]: DTPCardContent,
    [MapItemType.DesignCode]: DesignCodeCardContent,
};

export const REQUEST_BY_TYPE = {
    [MapItemType.OKN]: okn.getObject,
    [MapItemType.Houses]: houseBase.getObject,
    [MapItemType.DTP]: dtp.getObject,
    [MapItemType.DesignCode]: designCode.getObject,
};
