import * as React from 'react';

interface Props {
    isActive?: boolean;
}

export function CameraMarker({ isActive }: Props) {
    const color = isActive ? '#B4F300' : '#F30000';
    const gradientId = `camera_active_${String(isActive)}`;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={57} height={57} fill="none">
            <path
                fill={`url(#${gradientId})`}
                d="M28.02.018c-15.464 0-28 12.536-28 28h56c0-15.464-12.536-28-28-28Z"
            />
            <circle cx={28.02} cy={28.018} r={8} fill={color} />
            <defs>
                <radialGradient
                    id={gradientId}
                    cx={0}
                    cy={0}
                    r={1}
                    gradientTransform="rotate(90 14.001 14.019) scale(28.5091)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color} />
                    <stop offset={1} stopColor={color} stopOpacity={0} />
                </radialGradient>
            </defs>
        </svg>
    );
}
