"use client"

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCircleInfo, FaDownload, FaFile } from "react-icons/fa6"
import { FaDatabase, FaEthereum } from "react-icons/fa"
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { hasPurchased } from '@/lib/purchase_backend'

export default function FilesList({ files, type, id }: { files: string[], type: string, id: string }) {
	const { address } = useAccount()
	const [isPurchased, setIsPurchased] = useState(false)

	useEffect(() => {
		if (address == null) return

		hasPurchased(address, type, id)
			.then((x) => {
				setIsPurchased(x)
			})
	}, [type, id, setIsPurchased])

	return isPurchased ? (
		<Card>
			<CardHeader>
				<CardTitle className="flex gap-4 items-center">
					<FaDatabase /> Downloads
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{
					files.map((file: string) => (
						<a href={file}>
							<div className="flex gap-4 items-center pb-2 border-b border-border">
								<FaFile />
								<p className="font-bold text-xl">{file.split("/resolve/main/")[1].replaceAll("?download=true", "")}</p>

								<div className="flex-1"></div>

								<FaDownload />
							</div>
						</a>
					))
				}

				{(files.length ?? 0) > 0 ? null : <p>No files linked</p>}
			</CardContent>
		</Card>
	) : null
}