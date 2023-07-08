import { HistogramData } from '../types';

export function getValueFromPercent(data: HistogramData, percent: number) {
    const oneSliderBlockWidth = 100 / data.length;

    const index = Math.min(Math.floor(percent / oneSliderBlockWidth), data.length - 1);

    const dataValue = data[index];
    const dataFromPercent = oneSliderBlockWidth * index;
    const percentMinusFromPercent = percent - dataFromPercent;

    const percentsBetweenFromAndInitial = (100 / oneSliderBlockWidth) * percentMinusFromPercent;

    const yearsDiff = dataValue.to - dataValue.from;

    const toAdd = (yearsDiff / 100) * percentsBetweenFromAndInitial;

    return dataValue.from + Math.round(toAdd);
}
