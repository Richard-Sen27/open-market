/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('pino-pretty', /* add any other modules that might be causing the error */);
		return config;
	},	
    images: {
        domains: ['via.placeholder.com', 'cdn2.iconfinder.com', 'cdn3.iconfinder.com', 'cdn4.iconfinder.com', "cdn-icons-png.freepik.com", "storage.googleapis.com", "picsum.photos", "fastly.picsum.photos", "th.bing.com"],
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
