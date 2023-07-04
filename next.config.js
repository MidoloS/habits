const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */

// allow supabase images

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
  images: {
    domains: [
      "supabase.co",
      "mabfjyjbggqdwqtjdwip.supabase.co",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = { ...pwa, ...next };
