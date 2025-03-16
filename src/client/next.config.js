/**
 * Next.js Configuration
 * 
 * This file configures Next.js for the LitSpark Brand Solutions application.
 * It includes settings for API proxying, environment variables, and build optimization.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configure environment variables
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000/api',
  },
  
  // Configure image domains for next/image
  images: {
    domains: ['localhost', 'litspark-brand-solutions.com'],
  },
  
  // Configure redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Configure API proxy for development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
