"use client"

import LoadingComponent from "@/components/LoadingComponent"
import { contractConfig } from "@/lib/nft_contract"
import { useInfiniteReadContracts } from "wagmi"

interface NFTData {
	name: string
	url: string
}

export default function CharactersList({ limit = 10 }: { limit: number } = { limit: 10 }) {
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
	
	console.log(nfts)

	return (
		<div className="grid grid-cols-5">
			{
				nfts.map((nft) => (
					<div className="overflow-clip">
						<img src={nft.url} className="aspect-square w-full rounded-xl" />
						<span className='font-bold text-2xl mt-2'>{nft.name}</span>
					</div>
				))
			}
		</div>
	)
}