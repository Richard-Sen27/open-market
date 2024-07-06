"use client"

import LoadingComponent from "@/components/LoadingComponent"
import { contractConfig } from "@/lib/nft_contract"
import { useInfiniteReadContracts } from "wagmi"

export default function CharactersList({ limit = 10 }: { limit: number } = { limit: 10 }) {
	const { data, fetchNextPage, isPending, isError } = useInfiniteReadContracts({
		cacheKey: 'nfts',
		contracts(pageParam: any) {
			return [...new Array(limit)].map((_, i) =>
				({
				...contractConfig,
				functionName: 'tokenURI',
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

	console.log(data)

	return (
		<p>
			gdfyuiop
			{/* {data} */}
		</p>
	)
}