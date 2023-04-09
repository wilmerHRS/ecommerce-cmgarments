/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'www.softzone.es'
    ]
  }
}

module.exports = nextConfig
