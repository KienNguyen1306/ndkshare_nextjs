/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  }
};

export default nextConfig;
