/* eslint-disable */

import { NextApiRequest, NextApiResponse } from 'next';
import {useEffect, useState} from "react";
import {getAllPlacemarks} from "./dataRepository";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
    const [placemarks, setPlacemarks] = useState([]);

    useEffect(() => {
        async function getData(){
            const data = await getAllPlacemarks();
            setPlacemarks(data);
        }
        void getData();
    })
    res.status(200).json(placemarks);
}
