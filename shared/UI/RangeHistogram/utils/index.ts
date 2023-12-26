import { round } from 'shared/helpers/round';

export function getPercent(min: number, max: number, value: number) {
  return Math.round(((value - min) / (max - min)) * 1000) / 10;
}

export function randomData(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getAbsolutePartInBlock(percent: number, blockWidth: number) {
  let absolutePartInBlock = round(percent % blockWidth, 4);

  if (percent !== 0 && !absolutePartInBlock) {
    absolutePartInBlock = blockWidth;
  }

  return absolutePartInBlock;
}
