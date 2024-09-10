/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        instrumentationHook: true,
    },
};

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav: true,
    cacheStartUrl: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true,
    }
});

export default withPWA(nextConfig);

// export default nextConfig;
