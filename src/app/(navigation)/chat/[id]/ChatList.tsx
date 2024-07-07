"use client"

import { useEffect, useRef, useState } from "react"
import { useAccount, useChainId, useReadContract, useReadContracts, useSwitchChain, useWatchContractEvent, useWriteContract } from "wagmi"

import { abi, contractConfig } from '@/lib/nft_contract'
import { FaPaperPlane } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import ProfileIcon from "@/components/ProfileIcon"
import { isError } from "util"
import LoadingComponent from "@/components/LoadingComponent"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { NFTData } from "../CharactersList"
import NavTitle from "@/components/NavTitle"

interface Message {
	role: string
	content: string
}

export default function ChatList({ id }: { id: string }) {
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	const { switchChainAsync } = useSwitchChain()

	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState<Message[]>([])
	const [waitingForNewMessage, setWaitingForNewMessage] = useState(false)
	const [waitingForWaitingForNewMessage, setWaitingForWaitingForNewMessage] = useState(false)

	const { data: contractData, isPending: contractIsPending, isError: contractIsError } = useReadContract({ ...contractConfig, functionName: "chatRuns", args: [BigInt(id)] })
	const { data: nftData, isPending: nftDataIsPending, isError: nftDataIsError } = useReadContract({ ...contractConfig, functionName: "nftData", args: [((contractData ?? [undefined])[0]) as any] })

	const { data, isError, isPending, refetch } = useReadContracts({
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

	useEffect(() => {
		if (waitingForWaitingForNewMessage || waitingForNewMessage) {
			const interval = setInterval(() => {
				refetch()
			}, 1000)

			return () => {
				clearInterval(interval)
			}
		}
	}, [waitingForWaitingForNewMessage, waitingForNewMessage, refetch])

	const { writeContractAsync } = useWriteContract()

	useEffect(() => {
		if (data == null) return
		if (data[0].status != 'success' || data[1].status != 'success') return

		const rolesData = data[0].result
		const messagesData = data[1].result

		if (!rolesData || !messagesData) return
		if (messagesData.length != rolesData.length) return

		setMessages(messagesData.map((m, i) => ({ content: m, role: rolesData[i] })))
	}, [data])

	useEffect(() => {
		scrollAreaRef.current?.scrollTo(0, scrollAreaRef.current.scrollHeight)
		console.log(scrollAreaRef.current)
	}, [messages, scrollAreaRef])

	useEffect(() => {
		if (waitingForWaitingForNewMessage && messages[messages.length - 1].role == 'user') {
			setWaitingForNewMessage(true)
			setWaitingForWaitingForNewMessage(false)
		}
	}, [waitingForWaitingForNewMessage, messages])

	useEffect(() => {
		if (waitingForNewMessage && messages[messages.length - 1].role == 'assistant') {
			setWaitingForNewMessage(false)
		}
	}, [waitingForNewMessage, messages])


	if (isError || contractIsError || nftDataIsError) {
		return <p>Error</p>
	}

	if (isPending || contractIsPending || nftDataIsPending) {
		return <LoadingComponent />
	}

	async function handleSubmit() {
		await switchChainAsync({ chainId: 696969 })
		await writeContractAsync({
			...contractConfig,
			functionName: 'addMessage',
			args: [message, BigInt(id)]
		})

		setMessage("")
		setWaitingForWaitingForNewMessage(true)
	}

	const chatData: NFTData = { name: nftData[0], url: nftData[1] }

	return (
		<div className="h-full">
			<NavTitle title={`Chat with ${chatData.name}`} />
			<ScrollArea style={{height: "calc(100vh - 129.5px)"}} ref={scrollAreaRef}>
				<div className="p-8 flex flex-col gap-4 relative flex-1 h-full">
					{
						messages
							.filter((m) => m.role != "system")
							.map((m) => (
								<div className="flex gap-4 items-start">
									<div
										className="rounded-xl w-12 h-12 overflow-clip flex-shrink-0 border border-border"
									>
										{
											m.role == 'user' ?
												<ProfileIcon /> :
												<img src={chatData.url} className="w-full h-full" />
										}
									</div>
									{m.content}
								</div>
							))
					}
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
			<Separator orientation="horizontal" className="h-[1.5px]" />
			<div className="h-16 p-3 flex gap-2 items-center flex-shrink-0">
				<input
					className="w-full border rounded-xl flex items-center h-9 resize-none overflow-hidden bg-background px-4 py-2"
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
		</div>
	)
}