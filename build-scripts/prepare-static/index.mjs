import https from 'node:https';
import fs from 'node:fs';
import items from '../../public/ekb-okn.json' assert { type: 'json' };
import { resize, optimize } from './prepareImages.mjs';
import {
    IMAGES_URLS_PATH,
    PLACEMARKS_CACHE_PATH,
    VERCEL_PUBLIC_IMAGES_PATH,
} from './constants.mjs';

const start = Date.now();

async function init() {
    console.log('Prepare images');

    await clearCachedImages(IMAGES_URLS_PATH);

    const imageUrls = getImagesUrls(items.features);

    console.log(`Download ${imageUrls.length} images`);
    const images = await downloadImages(imageUrls)
        .then(log('Resize images'))
        .then(resize)
        .then(log('Remove original size images'))
        .then(removeOriginalImages)
        .then(log('Optimize images'))
        .then(optimize)
        .catch(console.log);

    console.log('Save metadata');
    await saveMetadata(PLACEMARKS_CACHE_PATH, items.features, images);

    console.log(`Finish in ${(Date.now() - start) / 1000} seconds`);
}
init();

async function clearCachedImages(path) {
    if (fs.existsSync(path)) {
        fs.rmSync(path, { recursive: true });
    }

    fs.mkdirSync(path, { recursive: true });
}

function getImagesUrls(items) {
    return items.reduce((all, item) => {
        const img = item.properties.img;

        if (Boolean(img)) {
            if (typeof img === 'string') {
                return all.concat(img);
            }
            return all.concat(img.url);
        }
        return all;
    }, []);
}

async function downloadImages(urls) {
    const downloadImage = (url) =>
        new Promise((resolve, reject) => {
            const ext = 'jpg';
            const guid = getGUID(url);
            const filename = `${guid}.${ext}`;
            const file = fs.createWriteStream(IMAGES_URLS_PATH + filename);

            https.get(url, (response) => {
                response.pipe(file);
            });

            file.on('finish', () => {
                file.close();
                resolve({ id: guid, path: filename });
            });

            file.on('error', (e) => {
                console.error(`Not loaded: ${filename}`, e);
                reject();
            });
        });

    return Promise.all(urls.map(downloadImage));
}

function getGUID(fileUrl) {
    return new URL(fileUrl).pathname.split('/').at(-1).replace(/\D/g, '');
}

function log(message = '', getMessage = () => '') {
    return (...args) => {
        console.log(message, getMessage(...args));
        return Promise.resolve(...args);
    };
}

async function removeOriginalImages(items) {
    await Promise.all(
        items.map(
            (item) =>
                new Promise((resolve) => {
                    try {
                        fs.unlinkSync(IMAGES_URLS_PATH + item.path);
                    } catch (e) {
                        console.log(`Error remove ${e}`);
                    }
                    resolve();
                }),
        ),
    );
    return items;
}

async function saveMetadata(cachPath, items, images) {
    const imagesById = images.reduce((all, item) => {
        all[item.id] = item;
        return all;
    }, {});

    const updatedItems = items.map((item) => {
        const img = item.properties.img;

        if (Boolean(img)) {
            let guid = null;

            if (typeof img === 'string') {
                guid = getGUID(img);
            }
            guid = getGUID(img.url);
            const image = imagesById[guid];

            if (image) {
                return {
                    ...item,
                    properties: {
                        ...item.properties,
                        preview: {
                            id: image.id,
                            m: {
                                ...image.m,
                                src: `${VERCEL_PUBLIC_IMAGES_PATH}m_${image.path}`,
                            },
                            s: {
                                ...image.s,
                                src: `${VERCEL_PUBLIC_IMAGES_PATH}s_${image.path}`,
                            },
                        },
                    },
                };
            }
        }

        return item;
    });

    fs.writeFileSync(
        cachPath,
        JSON.stringify({
            type: 'FeatureCollection',
            name: 'ek-okn',
            features: updatedItems,
        }),
    );
}
