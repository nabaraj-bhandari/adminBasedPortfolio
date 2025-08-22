const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable image optimization with advanced settings
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Advanced caching headers
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/image/:all*",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  // Enable compression
  compress: true,
  // Optimize CSS
  swcMinify: true,
  // Enable experimental features for performance
  experimental: {
    // Enable server components caching
    serverComponentsExternalPackages: ["mongoose", "mongodb"],
    // Improved server stability
    serverActions: true,
    serverMinification: true,
  },
  // Server configuration
  server: {
    // Increase timeouts
    apiTimeout: 60000,
    // Handle connection issues gracefully
    keepAliveTimeout: 70000,
  },
  // Improve error handling
  onError: (err) => {
    console.error("Next.js server error:", err);
  },
  // Configure memory limits
  serverRuntimeConfig: {
    // Increase memory limit for server-side operations
    maxMemory: "512mb",
  },
  webpack: (config, { isServer }) => {
    // Handle MongoDB and native modules
    if (isServer) {
      // Server-side externals for MongoDB
      config.externals = config.externals || [];
      config.externals.push({
        "mongodb-client-encryption": "mongodb-client-encryption",
        "@mongodb-js/zstd": "@mongodb-js/zstd",
        "gcp-metadata": "gcp-metadata",
        aws4: "aws4",
        "bson-ext": "bson-ext",
        kerberos: "kerberos",
        snappy: "snappy",
        socks: "socks",
      });
    }

    // Handle .node files and other binary files
    config.module.rules.push(
      {
        test: /\.node$/,
        use: "node-loader",
      },
      {
        test: /\.(wasm|node)$/,
        type: "javascript/auto",
        use: "file-loader",
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
