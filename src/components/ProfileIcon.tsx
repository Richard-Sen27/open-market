"use client"

import Identicon from "./Identicons"
import { useAccount } from "wagmi";

export default function ProfileIcon() {
	const { address, isConnected } = useAccount()

	if (!isConnected) return null

	return (
		<Identicon string={address} size={400} className="w-full h-full" />
	)
}