/* eslint-disable */
import dynamic from 'next/dynamic';

import { designCode } from 'common/data/designCode/designCode';
import { okn } from 'common/data/okn/okn';
import { dtp } from 'common/data/dtp/dtp';
import { useEffect } from 'react';
import { OknAreaType, OknObjectSignificanceType } from 'common/data/okn/oknConstants';
import { DtpParticipantType } from 'common/data/dtp/dtpParticipantType';
import { DtpSeverityType } from 'common/data/dtp/dtpSeverityType';
import { lines } from 'common/data/lines/lines';
import { LineType } from 'common/data/lines/lineType';

export const App = dynamic(() => import('../components/App'), {
    ssr: false,
});

export default function Home() {
    useEffect(() => {
        // designCode.getObject('kamennyj-karer-b8562996').then(res => console.log(res));
        // designCode.getFilters().then(console.log);
        // designCode.getObjectsIds('Таблички ОКН').then(console.log);
        // okn.getAreaByType(OknAreaType.ObjectZone).then(console.log);
        // okn.getObject('123').then(console.log);
        // okn.getObjectsBySignificanceType(OknObjectSignificanceType.Municipal).then(console.log);
        // dtp.getObject('1771829').then(console.log);
        // dtp.getObjectsByParticipants(DtpParticipantType.Children).then(console.log);
        // dtp.getObjectsBySeverity(DtpSeverityType.Heavy).then(console.log);
        lines.getFilters().then(console.log);
        lines.getLineObjects(LineType.BlueLine).then(console.log);
        lines.getLinePolylines(LineType.PurpleLine).then(console.log);
    }, []);
    return <App />;
}
