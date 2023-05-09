import { range } from 'lodash';

import { DtpParticipantType } from 'common/data/dtp/dtpParticipantType';
import { DtpSeverityType } from 'common/data/dtp/dtpSeverityType';
import { IconType } from 'components/UI/Icons/Icons.types';
import { HistogramDataWithoutValues } from 'components/UI/RangeHistogram';

export type ParticipantConfig = Record<DtpParticipantType, { icon: IconType; label?: string }>;

export const MIN_DTP_YEAR = 2015;
export const CURRENT_YEAR = new Date().getFullYear();

export const DTP_PARTICIPANT_CONFIG: ParticipantConfig = {
    [DtpParticipantType.Children]: {
        icon: IconType.Children,
    },
    [DtpParticipantType.Auto]: {
        icon: IconType.Auto,
        label: 'Автомобилисты',
    },
    [DtpParticipantType.Cyclists]: {
        icon: IconType.Bycicle,
    },
    [DtpParticipantType.Motorcyclists]: {
        icon: IconType.Bike,
    },
    [DtpParticipantType.Pedestrians]: {
        icon: IconType.Pedestrian,
    },
    [DtpParticipantType.PublicTransport]: {
        icon: IconType.PublicTransport,
        label: 'Общественный транспорт',
    },
};

export const SEVERITY_CONFIG = {
    [DtpSeverityType.Heavy]: {
        color: '#ff640f',
    },
    [DtpSeverityType.Light]: {
        color: '#e3bd00',
    },
    [DtpSeverityType.WithDead]: {
        color: '#e63223',
    },
};

export const YEARS_FILTERS_DATA: HistogramDataWithoutValues = range(MIN_DTP_YEAR, CURRENT_YEAR).map(
    (year) => ({
        from: year,
        to: year + 1,
        color: '#7793db',
    }),
);
