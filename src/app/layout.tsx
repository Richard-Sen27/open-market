import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

import { Providers } from "./provider";
import { cookieToInitialState } from 'wagmi'
import { config } from "@/lib/wagmi_config";
import { headers } from "next/headers";
import ThemeWrapper from "@/components/ThemeWrapper";

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

	return (
		<html lang="en">
			<ThemeWrapper>
				<Providers initialState={initialState}>
					<div className="flex flex-1">
						<Navbar />
						<Separator orientation="vertical" />
						<div className="w-full h-full">
							{children}
						</div>
					</div>
				</Providers>
			</ThemeWrapper>
		</html>
	);
}
