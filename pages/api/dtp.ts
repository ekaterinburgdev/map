import { FeatureCollection } from 'geojson';
import dtpsJSON from 'public/ekb-dtps.json';

export default async function handler(req, res) {
    const dtps = dtpsJSON as FeatureCollection;
    const byId = {
        type: 'FeatureCollection',
        features: dtps.features.filter((x) => x.properties.id === Number(req.query.id)),
    };

    res.status(200).json(byId);
}
