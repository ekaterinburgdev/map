import { LatLngExpression } from 'leaflet';

import { DtpSeverityType } from 'common/data/dtp/dtpSeverityType';

export type DTPMapDataProps = {
    id: string;
    coords: LatLngExpression;
    severityType: DtpSeverityType;
};
