/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'superb-okapi-97.convex.cloud'
            }
        ]
    },
    eslint:{
        ignoreDuringBuilds:true
    },
    typescript:{
        ignoreBuildErrors:true
    },
};

export default nextConfig;
