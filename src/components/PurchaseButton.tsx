"use client"

import { useSendTransaction, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect } from "react";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";

export default function PurchaseButton({ text, price }: { text: string, price: number }) {
	const { data: hash, isPending, sendTransaction } = useSendTransaction()
	const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
	const { switchChainAsync } = useSwitchChain()

	useEffect(() => {
		if (isConfirmed) {
			console.log('did purchase!!!!!')
		}
	}, [isConfirmed])

	async function purchaseClicked() {
		await switchChainAsync({ chainId: 1 })
		sendTransaction({
			to: '0xd7b6202152ff734176BCf36bc0D646547684B29d',
			value: parseEther(price.toFixed(0)),
			chainId: 1
		})
	}

	return (
		<Button
			onClick={purchaseClicked}
			variant="default"
			className="max-w-32 bg-green-500 hover:bg-green-700 w-full"
		>
			{text}
		</Button>
	)
}