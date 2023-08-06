import type { MapRef } from 'react-map-gl';
import type { DataDrivenPropertyValueSpecification, ExpressionInputType, ExpressionSpecification, FeatureIdentifier } from 'maplibre-gl';

export function getLayerStyle<T extends ExpressionInputType | ExpressionSpecification>(
    { initial, active }: { initial: T; active: T },
): DataDrivenPropertyValueSpecification<T> {
    return [
        'case',
        ['boolean', ['feature-state', 'active'], false],
        active,
        initial,
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
