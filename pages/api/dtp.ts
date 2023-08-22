import dtpsJSON from '../../public/ekb-dtps.json';

export default async function handler(req, res) {
    const dtps = dtpsJSON as { features: { properties: { id: number } }[] };
    const dtp = dtps.features.find((x) => x.properties.id === Number(req.query.id));

    res.status(200).json(dtp);
}
