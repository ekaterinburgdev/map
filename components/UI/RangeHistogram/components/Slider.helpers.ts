import { HistogramData } from '../types';
import { getAbsolutePartInBlock } from '../utils';

export function getValueFromPercent(data: HistogramData, percent: number) {
    console.log("get value from percent");
    console.log({data, percent});
    const oneSliderBlockWidth = 100 / data.length;

    const index = Math.min(Math.floor(percent / oneSliderBlockWidth), data.length - 1);

    const dataValue = data[index];

    const absolutePartInBlock = getAbsolutePartInBlock(percent, oneSliderBlockWidth);

    const partInBlock = absolutePartInBlock / oneSliderBlockWidth;

    const result = Math.round(partInBlock * (dataValue.to - dataValue.from) + dataValue.from);

    console.log({result});

    return result;
}

export function getValueFromPercent2(data: HistogramData, percent: number) {
    console.log("get value from percent");
    console.log({data, percent});
    const oneSliderBlockWidth = 100 / data.length;

    const index = Math.min(Math.floor(percent / oneSliderBlockWidth), data.length - 1);

    const dataValue = data[index];
    const dataFromPercent = oneSliderBlockWidth * index;
    const percentMinusFromPercent = percent - dataFromPercent;

    const percentsBetweenFromAndInitial = 100 / oneSliderBlockWidth * percentMinusFromPercent;

    const yearsDiff = dataValue.to - dataValue.from;

    const toAdd = yearsDiff / 100 * percentsBetweenFromAndInitial;

    return dataValue.from + Math.round(toAdd);
}
