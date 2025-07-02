    /** @type {import('next').NextConfig} */
    const nextConfig = {
      experimental: {
        ppr: 'incremental', // Enable Partial Prerendering
      },
    };

    module.exports = nextConfig;
    