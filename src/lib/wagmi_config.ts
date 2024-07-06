import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { defineChain } from 'viem'

export const galadrielDevnet = defineChain({
	id: 696969,
	name: 'Galadriel Devnet',
	nativeCurrency: { name: 'Galadriel', symbol: 'GAL', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://devnet.galadriel.com'] },
	},
	blockExplorers: {
		default: { name: 'Explorer', url: 'https://explorer.galadriel.com' },
	},
})


export const config = createConfig({
	chains: [mainnet, sepolia, galadrielDevnet],
	// ssr: true,
	// storage: createStorage({
	// 	storage: cookieStorage,
	// }),
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[galadrielDevnet.id]: http()
	},
})
