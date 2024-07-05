"use client"

import { config } from "@/lib/wagmi_config"
import GlobalContext from "./GlobalContext"
import { SessionProvider } from "next-auth/react"
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children, initialState }: { children: React.ReactNode, initialState: any }) {
	return (
		<WagmiProvider config={config} initialState={initialState} >
			<QueryClientProvider client={queryClient}>
				<SessionProvider refetchInterval={0}>
					<GlobalContext>
						{children}
					</GlobalContext>
				</SessionProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}