export function round(num: number, decimalPlaces = 0) {
  const multiplier = 10 ** decimalPlaces;

  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}
