const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */

// allow supabase images

const pwa = withPWA({
  pwa: {
    register: true,
    skipWaiting: true,
    dest: "public",
    importScripts: ["/worker.js"],
  },
});

const next = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "supabase.co",
      "mabfjyjbggqdwqtjdwip.supabase.co",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = { ...pwa, ...next };
