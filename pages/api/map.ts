import { NextApiRequest, NextApiResponse } from 'next';
import { useEffect, useState } from 'react';

import { getAllPlacemarks } from './dataRepository';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [placemarks, setPlacemarks] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        async function getData() {
            const data = await getAllPlacemarks();

            setPlacemarks(data);
        }

        getData();
    });

    res.status(200).json(placemarks);
}
