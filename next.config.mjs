/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_API: process.env.BASE_API,
        HOST: process.env.HOST,
        USER: process.env.USER,
        DATABASE: process.env.DATABASE,
      },
};

export default nextConfig;
