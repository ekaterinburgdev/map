import React from 'react';

import { IconBaseProps } from './Icons.types';

export function Auto({ color, mix }: IconBaseProps) {
    return (
        <svg
            className={mix}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.7444 9.58446H6.25641C5.56841 9.58446 5.02441 10.1125 5.02441 10.8165V13.7285H6.70441V12.8965H13.2964V13.7285H14.9764V10.8165C14.9764 10.1125 14.4324 9.58446 13.7444 9.58446ZM8.84841 7.52046H11.1524C12.0004 7.52046 12.6884 8.35246 13.0884 8.99246H14.9764V7.82446H13.6804C13.1524 7.07246 12.3524 6.27246 11.1524 6.27246H8.84841C7.64841 6.27246 6.84841 7.07246 6.32041 7.82446H5.02441V8.99246H6.91241C7.31241 8.35246 8.00041 7.52046 8.84841 7.52046ZM5.85641 11.2485C5.85641 10.7845 6.20841 10.4165 6.67241 10.4165C7.13641 10.4165 7.50441 10.7845 7.50441 11.2485C7.50441 11.7125 7.13641 12.0645 6.67241 12.0645C6.20841 12.0645 5.85641 11.7125 5.85641 11.2485ZM12.4964 11.2485C12.4964 10.7845 12.8484 10.4165 13.3124 10.4165C13.7764 10.4165 14.1444 10.7845 14.1444 11.2485C14.1444 11.7125 13.7764 12.0645 13.3124 12.0645C12.8484 12.0645 12.4964 11.7125 12.4964 11.2485Z"
                fill={color}
            />
        </svg>
    );
}
