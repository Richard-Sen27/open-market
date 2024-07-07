"use client"

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getPurchases, getUploaded } from '@/lib/purchase_backend'
import ModelCard from './ModelCard'

export default function PurchasesList() {
	const { address } = useAccount()

	const [purchases, setPurchases] = useState([])
	const [uploaded, setUploaded] = useState([])

	useEffect(() => {
		getPurchases(address as any)
			.then((x: any) => setPurchases(x))

		getUploaded(address as any)
			.then((x: any) => setUploaded(x))
	}, [address])

	

	return (
		<div>
			<h1 className='text-3xl font-black mb-4'>{address}</h1>

			<p className="text-xl font-bold mt-4">Purchased</p>
			<div className="grid grid-cols-1 mt-2 gap-5">
				{
					purchases
						.filter((model: any) => model.data.published || true)
						.map((model: any) => (
							<ModelCard
								key={model.data.id}
								id={model.data.id}
								title={model.data.title}
								author={model.data.author!.id}
								description={model.data.description}
								downloads={model.data.downloads}
								price={model.data.price / 100}
								type={model.type == 'normal' ? model.data.type : 'Super Dataset'}
								image={model.data.image}
								href={model.type == 'normal' ? `/browse/${model.data.id}` : `/browse/super/${model.data.id}`}
								showBuy={false}
							/>
						))
				}
			</div>

			<p className="text-xl font-bold mt-4">Authored</p>
			<div className="grid grid-cols-1 mt-2 gap-5">
				{
					uploaded
						.filter((model: any) => model.data.published || true)
						.map((model: any) => (
							<ModelCard
								key={model.data.id}
								id={model.data.id}
								title={model.data.title}
								author={model.data.author!.id}
								description={model.data.description}
								downloads={model.data.downloads}
								price={model.data.price / 100}
								type={model.type == 'normal' ? model.data.type : 'Super Dataset'}
								image={model.data.image}
								href={model.type == 'normal' ? `/browse/${model.data.id}` : `/browse/super/${model.data.id}`}
								showBuy={false}
							/>
						))
				}
			</div>

		</div>
	)
}