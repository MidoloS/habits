const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */

const pwa = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

const next = {
  experimental: {
    appDir: true,
  },
};

module.exports = { ...pwa, ...next };
