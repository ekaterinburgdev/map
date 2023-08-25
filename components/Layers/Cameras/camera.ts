import cameras from '../../../public/ekb-cameras.json';

export interface CameraFeature {
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: {
        id: string;
        address: string;
        directionDescription: string;
        angle: number;
        streamHlsUrl: string;
    };
}

export const camera = {
    async getObject(id: string): Promise<CameraFeature> {
        return Promise.resolve(cameras.features.find((c) => c.properties.id === id));
    },
};
