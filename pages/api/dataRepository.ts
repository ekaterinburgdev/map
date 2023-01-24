/* eslint-disable */

import { MapItemType } from '../../common/types/map-item';

let hash = undefined;

export async function getAllPlacemarks() {
    if (hash) return hash;

    let placemarks = [];

    const okns = await getOkns();
    placemarks = placemarks.concat(okns);

    const houses = await getHouses();
    placemarks = placemarks.concat(houses);

    hash = placemarks;
    return placemarks;
}

async function getOkns() {
    const okns = await fetch(
        'https://map-api.ekaterinburg.io/api/okn-objects?populate=geometry,data&pagination[pageSize]=60',
    ).then(async (x) => JSON.parse(await x.text()).data);
    for (let i = 0; i < okns.length; i++) {
        const current = okns[i];
        const previewItem = current.attributes.img.length
            ? JSON.parse(current.attributes.img.replaceAll("'", '"'))
            : undefined;

        okns[i] = {
            coords: [
                current.attributes.geometry.coordinates[1],
                current.attributes.geometry.coordinates[0],
            ],
            description: '',
            id: String(current.id),
            images: [],
            name: current.attributes.name,
            address: current.attributes.address,
            date: current.attributes.date,
            oknNumber: current.attributes.okn_number,
            isExist: current.attributes.isExist,
            preview: previewItem,
            street: '',
            type: MapItemType.OKN,
        };
    }
    return okns;
}

async function getHouses() {
    const houses = await fetch(
        'https://map-api.ekaterinburg.io/api/house?populate=geometry,data,adress&pagination[pageSize]=60',
    ).then(async (x) => JSON.parse(await x.text()).data);
    for (let i = 0; i < houses.length; i++) {
        const current = houses[i];
        houses[i] = {
            coords: [
                current.attributes.geometry.coordinates[1],
                current.attributes.geometry.coordinates[0],
            ],
            description: '',
            id: String(current.id),
            images: [],
            name: current.attributes.Address,
            condition: current.attributes.Condition,
            company: current.attributes.Management_company,
            wearTear: current.attributes.WearAndTear,
            series: current.attributes.Series,
            floors: current.attributes.Floors,
            date: current.attributes.Year,
            street: '',
            type: MapItemType.Houses,
        };
    }
    return houses;
}
