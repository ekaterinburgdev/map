import type {
    DataDrivenPropertyValueSpecification,
    ExpressionInputType,
    ExpressionSpecification,
} from 'maplibre-gl';

export function getLayerStyle<T extends ExpressionInputType | ExpressionSpecification>({
    initial,
    active,
    hover,
}: {
    initial: T;
    active?: T;
    hover: T;
}): DataDrivenPropertyValueSpecification<T> {
    return [
        'case',
        ['boolean', ['feature-state', 'active'], false],
        active,
        ['boolean', ['feature-state', 'hover'], false],
        hover,
        initial,
    ];
}
