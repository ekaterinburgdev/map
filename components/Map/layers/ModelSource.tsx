import React from 'react';
import { useMap } from 'react-map-gl';
import { getModelLayer } from 'components/Layers/Model';

export function ModelSource() {
    const ekbMap = useMap();

    return (
        <input
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}
            type="file"
            onChange={(e) => {
                const map = ekbMap?.current?.getMap?.();
                map.addLayer(
                    // @ts-ignore
                    getModelLayer(
                        `3d-model-${Math.round(Math.random() * 1000)}`,
                        URL.createObjectURL(e.target.files[0]),
                    ),
                );
            }}
        />
    );
}
