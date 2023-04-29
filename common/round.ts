export function round(num: number, decimalPlaces = 0) {
    const multyplier = 10 ** decimalPlaces;

    return Math.round((num + Number.EPSILON) * multyplier) / multyplier;
}
