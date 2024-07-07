"use client"

import { useSendTransaction, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect } from "react";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";

export default function PurchaseButton({ text, price }: { text: string, price: number }) {
	const { data: hash, isPending, sendTransaction } = useSendTransaction()
	const { isLoading: isLoadingConfirmed, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, chainId: 11155111 })
	const { switchChainAsync } = useSwitchChain()

	useEffect(() => {
		if (isLoadingConfirmed) {
			console.log('did purchase!!!!!')
		}
	}, [isLoadingConfirmed])

	async function purchaseClicked() {
		await switchChainAsync({ chainId: 11155111 })
		sendTransaction({
			to: '0xd7b6202152ff734176BCf36bc0D646547684B29d',
			value: parseEther((price / 100).toFixed(8)),
			chainId: 11155111
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