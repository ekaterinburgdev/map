import { NextApiRequest, NextApiResponse } from 'next';
import placemarks from 'public/notion-static/placemarks.json';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(placemarks);
}
