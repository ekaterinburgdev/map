export function getPercent(min: number, max: number, value: number) {
    return Math.round(((value - min) / (max - min)) * 100);
}

export function randomData(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
