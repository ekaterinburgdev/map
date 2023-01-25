/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        dirs: ['pages', 'components', 'api', 'common'],
    },
    images: {
        loader: 'custom',
    },
};

module.exports = nextConfig;
