/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
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
  experimental: {
    // Enable server components caching
    serverComponentsExternalPackages: ['mongoose', 'mongodb'],
  },
};

module.exports = nextConfig;
