/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        config.optimization.splitChunks.cacheGroups = {
          ...config.optimization.splitChunks.cacheGroups,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        };
      }
      return config;
    },
    swcMinify: true,
    images: {
        formats: ['image/webp'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.truyen3o.com',
            port: ''
          },
          {
            protocol: 'https',
            hostname: '**.otruyenapi.com',
            port: ''
          },
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: ''
          },
          {
            protocol: 'http',
            hostname: 'picsum.photos',
            port: ''
          },
          {
            protocol: 'https',
            hostname: 'placehold.jp',
            port: ''
          },
          {
            protocol:'http',
            hostname: 'localhost',
            port: '3000'
          },
          {
            protocol:'http',
            hostname: 'localhost',
            port: '8000'
          }
        ]
    },
    async rewrites() {
        return [
          {
            source: '/baseapi/:path*',
            destination: `${process.env.NEXT_PUBLIC_BASE_API}/api/:path*`,
          },
        ]
    },
};

export default nextConfig;
