"use client"

import { useEffect, useState } from "react"
import { useAccount, useChainId, useReadContract, useReadContracts, useWatchContractEvent, useWriteContract } from "wagmi"

import { abi, contractConfig } from '@/lib/nft_contract'
import { FaPaperPlane } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import ProfileIcon from "@/components/ProfileIcon"
import { isError } from "util"
import LoadingComponent from "@/components/LoadingComponent"

interface Message {
	role: string
	content: string
}

const NFT_URL = "https://storage.googleapis.com/galadriel-assets/d8f2d423-f0d9-4e39-96fe-da7ab059037a.png"

export default function ChatList({ id }: { id: string }) {
	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState<Message[]>([])	

	// const {
	// 	data: tokenURI,
	// 	isError: tokenIsError,
	// 	isPending: tokenIsPending
	// } = useReadContract({
	// 	address: CONTRACT_ADDRESS,
	// 	functionName: 'tokenURI',
	// 	args: [BigInt(id)],
	// 	chainId: 696969,
	// 	abi
	// })

	const { data, isError, isPending } = useReadContracts({
		contracts: [
			{
				...contractConfig,
				functionName: 'getMessageHistoryRoles',
				args: [BigInt(id)]
			},
			{
				...contractConfig,
				functionName: 'getMessageHistoryContents',
				args: [BigInt(id)]

			}
		]
	})

	const { writeContract } = useWriteContract()

	useEffect(() => {
		if (data == null) return
		if (data[0].status != 'success' || data[1].status != 'success') return

		const rolesData = data[0].result
		const messagesData = data[1].result

		if (!rolesData || !messagesData) return
		if (messagesData.length != rolesData.length) return

		setMessages(messagesData.map((m, i) => ({ content: m, role: rolesData[i] })))
	}, [data])

	if (isError) {
		return <p>Error</p>
	}

	if (isPending) {
		return <LoadingComponent />
	}

	function handleSubmit() {
		writeContract({
			...contractConfig,
			functionName: 'addMessage',
			args: [message, BigInt(id)]
		})
	}

	return (
		<>
			<div className="p-8 flex flex-col gap-4 relative flex-1 h-full">
				{
					messages
						.filter((m) => m.role != "system")
						.map((m) => (
							<div className="flex gap-4 items-center">
								<div
									className="rounded-xl w-12 h-12 overflow-clip flex-shrink-0"
								>
									{
										m.role == 'user' ?
											<ProfileIcon /> :
											<img src={NFT_URL} className="w-full h-full" />
									}
								</div>
								{m.content}
							</div>
						))
				}
			</div>
			<Separator orientation="horizontal" className="h-[1.5px]" />
			<div className="h-16 p-3 flex gap-2 items-center">
				<input
					className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background px-4 py-2"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.keyCode == 13 && !e.shiftKey) {
							handleSubmit()
						}
					}}
				/>
				<button className="p-2 rounded-xl border-border border hover:bg-border/40" onClick={handleSubmit}>
					<FaPaperPlane className="w-4 h-4 text-gray-800" />
				</button>
			</div>
		</>
	)
}