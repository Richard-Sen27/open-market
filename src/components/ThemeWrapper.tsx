"use client"

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { useDarkMode, useIsClient } from "usehooks-ts"

const inter = Inter({ subsets: ["latin"] });

export default function ThemeWrapper({ children }: { children: React.ReactElement }) {
	const { isDarkMode, toggle, enable, disable } = useDarkMode({ localStorageKey: 'theme' })

	if (!useIsClient()) return null

	return (
		<body className={cn(inter.className, "h-screen p-0 overflow-hidden", isDarkMode ? "dark" : "")} style={{ padding: 0}}>
			{children}
		</body>
	)
}