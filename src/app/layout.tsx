import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

import { Providers } from "./provider";
import { cookieToInitialState } from 'wagmi'
import { config } from "@/lib/wagmi_config";
import { headers } from "next/headers";
import ThemeWrapper from "@/components/ThemeWrapper";
import Header from "@/components/Header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
					{children}
				</Providers>
			</ThemeWrapper>
		</html>
	);
}
