/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-media0.fl.yelpcdn.com",
      },
      {
        protocol: "https",
        hostname: "s3-media1.fl.yelpcdn.com",
      },
      {
        protocol: "https",
        hostname: "s3-media2.fl.yelpcdn.com",
      },
      {
        protocol: "https",
        hostname: "s3-media3.fl.yelpcdn.com",
      },
      {
        protocol: "https",
        hostname: "s3-media4.fl.yelpcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.yelp.com",
      },
    ],
  },
};

module.exports = nextConfig;
