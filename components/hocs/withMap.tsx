import React from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

export function withMap<Props extends { map: L.Map }>(Component: React.ComponentType<Props>) {
    return function WrappedComponent(props: Omit<Props, 'map'>) {
        const map = useMap();

        // "as Props" needed to work around ts bug:
        // https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046
        return <Component {...(props as Props)} map={map} />;
    };
}
