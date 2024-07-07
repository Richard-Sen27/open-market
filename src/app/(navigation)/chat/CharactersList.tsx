"use client"

import LoadingComponent from "@/components/LoadingComponent"
import { contractConfig } from "@/lib/nft_contract"
import { config } from "@/lib/wagmi_config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { watchContractEvent } from "viem/actions"
import { useInfiniteReadContracts, usePublicClient, useReadContract, useSwitchChain, useTransactionConfirmations, useWatchContractEvent, useWriteContract } from "wagmi"

export interface NFTData {
	name: string
	url: string
}

export default function CharactersList({ limit = 10 }: { limit: number } = { limit: 10 }) {
	const router = useRouter()
	const { switchChainAsync } = useSwitchChain()
	const { writeContractAsync } = useWriteContract()

	const client = usePublicClient({ chainId: contractConfig.chainId })

	useEffect(() => {
		if (client == null) return
		
		const unmount = client.watchContractEvent({
			address: contractConfig.address,
			abi: contractConfig.abi,
			eventName: 'ChatCreated',
			onLogs: logs => {
				console.log(logs)
				logs.forEach((log) => {
					console.log(log)
					router.push(`/chat/${log.args.chatId}`)
				})
			}
		})

		return () => {
			unmount()
		}
	}, [client, router])
	
	const { data, fetchNextPage, isPending, isError } = useInfiniteReadContracts({
		cacheKey: 'nfts',
		contracts(pageParam: any) {
			return [...new Array(limit)].map((_, i) =>
				({
				...contractConfig,
				functionName: 'nftData',
				args: [BigInt(pageParam + i)],
				}) as const
			)
		},
		query: {
			initialPageParam: 1,
			getNextPageParam(_lastPage, _allPages, lastPageParam) {
				return lastPageParam + limit
			},		
		}
	})
	
	if (isError) {
		return <p>Error</p>
	}

	if (isPending) {
		return <LoadingComponent />
	}

	const nfts: NFTData[] = (data as any)
		.pages
		.flatMap((x: any) => x).filter((a: any) => a['status'] == "success" && a.result[0].length != 0)
		.map((x: any) => x.result)
		.map((x: any) => ({ name: x[0], url: x[1] }))
	
	async function chatWith(id: number) {
		await switchChainAsync({ chainId: 696969 })
		await writeContractAsync({
			...contractConfig,
			functionName: 'startChat',
			args: [BigInt(id), "How are you doing?"]
		})
	}

	return (
		<div className="grid grid-cols-5 gap-4">
			{
				nfts.map((nft, i) => (
					<button
						className="overflow-clip"
						onClick={() => chatWith(i + 1)}
					>
						<img src={nft.url} className="aspect-square w-full rounded-xl" />
						<span className='font-bold text-2xl mt-2'>{nft.name}</span>
					</button>
				))
			}
		</div>
	)
}