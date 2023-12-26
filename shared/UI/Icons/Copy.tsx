import React from 'react';

import { IconBaseProps } from './Icons.types';

export function Copy({ color, mix }: IconBaseProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={mix}
    >
      <mask
        id="mask0_6184_10300"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_6184_10300)">
        <path
          d="M2.76211 10.8002C2.49571 10.8002 2.26651 10.7044 2.07451 10.5128C1.88291 10.3212 1.78711 10.092 1.78711 9.8252V3.1376H2.76211V9.8252H8.26231V10.8002H2.76211ZM4.57471 8.9876C4.30791 8.9876 4.07871 8.8918 3.88711 8.7002C3.69551 8.5086 3.59971 8.2794 3.59971 8.0126V2.1752C3.59971 1.9084 3.69551 1.6792 3.88711 1.4876C4.07871 1.296 4.30791 1.2002 4.57471 1.2002H9.23731C9.51211 1.2002 9.74331 1.296 9.93091 1.4876C10.1185 1.6792 10.2123 1.9084 10.2123 2.1752V8.0126C10.2123 8.2794 10.1185 8.5086 9.93091 8.7002C9.74331 8.8918 9.51211 8.9876 9.23731 8.9876H4.57471ZM4.57471 8.0126H9.23731V2.1752H4.57471V8.0126Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
