"use client"

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { useDarkMode, useIsClient } from "usehooks-ts"

const inter = Inter({ subsets: ["latin"] });

export default function ThemeWrapper({ children }: { children: React.ReactElement }) {
	const { isDarkMode, toggle, enable, disable } = useDarkMode()

	if (!useIsClient()) return null

	return (
		<body className={cn(inter.className, "min-h-screen flex", isDarkMode ? "dark" : "")}>
			{children}
		</body>
	)
}