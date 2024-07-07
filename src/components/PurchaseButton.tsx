"use client"

import { useAccount, useSendTransaction, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { hasPurchased, storePurchase } from '@/lib/purchase_backend'

export default function PurchaseButton({ text, type, id, price }: { text: string, type: string, id: string, price: number }) {
	const { data: hash, isPending, sendTransaction } = useSendTransaction()
	const { isLoading: isLoadingConfirmed, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, chainId: 11155111 })
	const { switchChainAsync } = useSwitchChain()

	const { address } = useAccount()

	useEffect(() => {
		if (isLoadingConfirmed) {
			storePurchase(hash!, address!, type, id)
			setIsPurchased(true)
		}
	}, [isLoadingConfirmed])

	const [isPurchased, setIsPurchased] = useState(false)

	useEffect(() => {
		if (address == null) return

		hasPurchased(address, type, id)
			.then((x) => {
				setIsPurchased(x)
			})
	}, [type, id, setIsPurchased])

	async function purchaseClicked() {
		await switchChainAsync({ chainId: 11155111 })
		sendTransaction({
			to: '0xd7b6202152ff734176BCf36bc0D646547684B29d',
			value: parseEther((price / 100000).toFixed(8)),
			chainId: 11155111
		})
	}

	return !isPurchased ? (
		<Button
			onClick={purchaseClicked}
			variant="default"
			className="max-w-40 bg-green-500 hover:bg-green-700 w-full"
		>
			{text}
		</Button>
	) : (
		<Button
			variant="outline"
			className="max-w-40 w-full"
		>
			Already purchased
		</Button>
	)
}