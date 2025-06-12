/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io', 'avatars.githubusercontent.com','unsplash.com'],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuild: true,
  // },
  webpack: (config) => {
    // Add a rule to ignore .html files
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    });

    // Return the modified config
    return config;
  },
};

module.exports = nextConfig;
