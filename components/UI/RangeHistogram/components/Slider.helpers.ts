import { HistogramData } from '../types';
import { getAbsolutePartInBlock } from '../utils';

export function getValueFromPercent(data: HistogramData, percent: number) {
    const oneSliderBlockWidth = 100 / data.length;

    const index = Math.min(Math.floor(percent / oneSliderBlockWidth), data.length - 1);

    const dataValue = data[index];

    const absolutePartInBlock = getAbsolutePartInBlock(percent, oneSliderBlockWidth);

    const partInBlock = absolutePartInBlock / oneSliderBlockWidth;

    try {
        // TODO: madgic
        return Math.round(partInBlock * (dataValue.to - dataValue.from) + dataValue.from);
    } catch (e) {
        return 0;
    }
}
