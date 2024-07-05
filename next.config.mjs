/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['via.placeholder.com', 'cdn2.iconfinder.com', 'cdn3.iconfinder.com', 'cdn4.iconfinder.com', "cdn-icons-png.freepik.com"],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            port: '',
            pathname: '/*',
          },
        ],
      },
};

export default nextConfig;
