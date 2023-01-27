export interface HistogramDatum {
    from: number;
    to: number;
    value: number;
    color: string;
}

export type HistogramData = HistogramDatum[];

export type Range = { from: number; to: number };

export type MinMax = { min: number; max: number };
