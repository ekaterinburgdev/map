/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        dirs: ['pages', 'components', 'api']
    }
};

module.exports = nextConfig;
