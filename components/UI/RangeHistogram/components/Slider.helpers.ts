import { HistogramData } from '../types';

// data - age
// percent = 80
export function getValueFromPercent(data: HistogramData, percent: number) {
    // 12,5% is width of one bar
    const oneBarWidthInPercents = 100 / data.length;

    const index = Math.min(Math.floor(percent / oneBarWidthInPercents), data.length - 1);

    // this bar includes the 80th percent
    // from: 1991, to: 2010
    const dataValue = data[index];

    // 1991 is located on the 75th percent of the range
    const fromPositionInPercents = oneBarWidthInPercents * index;

    // 80 - 75 = 5%
    const fromInitialDiffInPercents = percent - fromPositionInPercents;

    // 100 / 12,5 * 5 = 40% - diff between initial and from in current bar in percents
    const percentsBetweenFromAndInitial = (100 / oneBarWidthInPercents) * fromInitialDiffInPercents;

    // 2010 - 1991 = 19 - diff between from and to in current bar in absolute values
    const fromToDiffInAbsoluteValues = dataValue.to - dataValue.from;

    // 19 / 100 * 40 = 7,6 - distance between initial and from in current bar in absolute values
    const toAddInAbsoluteValues = (fromToDiffInAbsoluteValues / 100)
      * percentsBetweenFromAndInitial;

    return dataValue.from + Math.round(toAddInAbsoluteValues);
}
