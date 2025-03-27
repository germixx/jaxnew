/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        config.devtool = false; // Prevents Webpack from using eval
        return config;
      },
};

export default nextConfig;
