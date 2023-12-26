import React from 'react';
import { AnimatedLogo } from 'ekb';

export function Loader({ radius = 100 }: { radius?: number }) {
  return <AnimatedLogo color="rgba(0, 0, 0, 0)" radius={`${radius}px`} />;
}
