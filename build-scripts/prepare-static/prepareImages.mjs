import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import { IMAGES_URLS_PATH } from './constants.mjs';

export async function optimize(items) {
    await imagemin([`${IMAGES_URLS_PATH}/*.{jpg,jpeg,png,svg}`], {
        destination: IMAGES_URLS_PATH,
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] }),
            imageminSvgo(),
        ],
    });

    return items;
}

export async function resize(items) {
    const resizeAndRoundOne = (filename, maxSize, prefix) =>
        sharp(IMAGES_URLS_PATH + filename)
            .composite([
                {
                    input: Buffer.from(
                        `<svg>
                            <circle
                                cx="${maxSize / 2}"
                                cy="${maxSize / 2}"
                                r="${maxSize / 2}"
                            />
                        </svg>`,
                    ),
                    blend: 'dest-in',
                },
            ])
            .resize({
                fit: sharp.fit.cover,
                width: maxSize,
                height: maxSize,
            })
            .toFile(IMAGES_URLS_PATH + prefix + '_' + filename)
            .then(({ width, height }) => ({ width, height }));

    return Promise.all(
        items.map(async ({ id, path }) => {
            const s = await resizeAndRoundOne(path, 80, 's');
            return { id, s, path };
        }),
    );
}
