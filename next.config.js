/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        dirs: ['pages', 'components', 'api', 'common'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'okn-mk.mkrf.ru',
                port: '',
                pathname: '/maps/show/id/**',
            },
        ],
        loader: 'custom',
    },
};

module.exports = nextConfig;
