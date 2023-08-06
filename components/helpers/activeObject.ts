import type { MapRef } from 'react-map-gl';
import type { DataDrivenPropertyValueSpecification, ExpressionInputType, FeatureIdentifier } from 'maplibre-gl';

export function getLayerActiveStyle<T extends ExpressionInputType>(normal: T, active: T): DataDrivenPropertyValueSpecification<T> {
    return [
        'case',
        ['boolean', ['feature-state', 'active'], false],
        active,
        normal,
    ];
}

export function setActiveObject(map: MapRef, object: FeatureIdentifier) {
    map.getCanvas().style.cursor = 'pointer';
    map.setFeatureState(object, { active: true },
    );
}

export function clearActiveObject(map: MapRef, object: FeatureIdentifier) {
    map.getCanvas().style.cursor = '';
    map.setFeatureState(object, { active: false });
}
