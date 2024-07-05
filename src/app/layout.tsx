import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

import { Providers } from "./provider";
import { cookieToInitialState } from 'wagmi'
import { config } from "@/lib/wagmi_config";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Open Market",
	description: "Sell and Buy ML Models on Web3 with Open Market",
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialState = cookieToInitialState(
		config,
		headers().get('cookie')
	)

	// const [{ data: connectData }, connect] = useConnect()
	// const [, signMessage] = useSignMessage()
	// const [{ data: accountData }] = useAccount()


	// const handleLogin = async () => {
	// 	try {
	// 	  await connect(connectData.connectors[0])
	// 	  const callbackUrl = '/protected'
	// 	  const message = new SiweMessage({
	// 		domain: window.location.host,
	// 		address: accountData?.address,
	// 		statement: 'Sign in with Ethereum to the app.',
	// 		uri: window.location.origin,
	// 		version: '1',
	// 		chainId: chainId,
	// 		nonce: await getCsrfToken(),
	// 	  })
	// 	  const { data: signature, error } = await signMessage({
	// 		message: message.prepareMessage(),
	// 	  })
	// 	  signIn('credentials', {
	// 		message: JSON.stringify(message),
	// 		redirect: false,
	// 		signature,
	// 		callbackUrl,
	// 	  })
	// 	} catch (error) {
	// 	  window.alert(error)
	// 	}
	//   }	

	return (
		<html lang="en">
			<body className={cn(inter.className, "min-h-screen flex dark")}>
				<Providers initialState={initialState}>
					<div className="flex flex-1">
						<Navbar />
						<Separator orientation="vertical" />
						<div className="w-full h-full">
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
