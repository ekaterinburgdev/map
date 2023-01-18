export interface HistogramDatum {
    from: number;
    to: number;
    value: number;
    color: string;
}

export type HistogramData = HistogramDatum[];

export type Range = { min: number; max: number };
