export interface HistogramDatum {
  from: number;
  to: number;
  value: number;
  color: string;
}
export type HistogramDatumWithoutValues = Omit<HistogramDatum, 'value'>;

export type HistogramData = HistogramDatum[];
export type HistogramDataWithoutValues = HistogramDatumWithoutValues[];

export type Range = { from: number; to: number };

export type MinMax = { min: number; max: number };
