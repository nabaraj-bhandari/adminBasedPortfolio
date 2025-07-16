const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable image optimization
  images: { 
    domains: ['images.pexels.com', 'example.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression
  compress: true,
  // Optimize CSS
  swcMinify: true,
  // Enable experimental features for performance
  experimental: {
    // Enable server components caching
    serverComponentsExternalPackages: ['mongoose', 'mongodb'],
  },
  webpack: (config, { isServer }) => {
    // Handle MongoDB and native modules
    if (isServer) {
      // Server-side externals for MongoDB
      config.externals = config.externals || [];
      config.externals.push({
        'mongodb-client-encryption': 'mongodb-client-encryption',
        '@mongodb-js/zstd': '@mongodb-js/zstd',
        'gcp-metadata': 'gcp-metadata',
        'aws4': 'aws4',
        'bson-ext': 'bson-ext',
        'kerberos': 'kerberos',
        'snappy': 'snappy',
        'socks': 'socks'
      });
    }

    // Handle .node files and other binary files
    config.module.rules.push(
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.(wasm|node)$/,
        type: 'javascript/auto',
        use: 'file-loader',
      }
    );

    // Ignore specific warnings for optional dependencies
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Error: Can't resolve/,
    ];

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
