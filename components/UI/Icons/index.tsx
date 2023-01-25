import React, { useMemo } from 'react';

import { ICON_BY_TYPE } from './Icons.constants';
import { IconType, IconBaseProps } from './Icons.types';

type IconProps = IconBaseProps & {
    type: IconType;
};

export function Icon({ type, ...baseProps }: IconProps) {
    const IconComponent = useMemo(() => ICON_BY_TYPE[type], [type]);

    return <IconComponent {...baseProps} />;
}
