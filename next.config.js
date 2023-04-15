/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'www.softzone.es',
      'aeroclub-issoire.fr'
    ]
  }
}

module.exports = nextConfig
