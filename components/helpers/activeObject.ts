import type { MapRef } from 'react-map-gl';
import type { DataDrivenPropertyValueSpecification, ExpressionInputType } from 'maplibre-gl';

export function getLayerActiveStyle<T extends ExpressionInputType>(normal: T, active: T): DataDrivenPropertyValueSpecification<T> {
    return [
        'case',
        ['boolean', ['feature-state', 'active'], false],
        active,
        normal,
    ];
}

export function setActiveObject(map: MapRef, objectId: number, layerId: string) {
    map.getCanvas().style.cursor = 'pointer';
    map.setFeatureState(
        { source: layerId, id: objectId },
        { active: true },
    );
}

export function clearActiveObject(map: MapRef, objectId: number, layerId: string) {
    map.getCanvas().style.cursor = '';
    map.setFeatureState(
        {
            source: layerId,
            id: objectId,
        },
        { active: false },
    );
}
