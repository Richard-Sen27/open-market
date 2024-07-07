"use server"

import prisma from "./prisma"

export async function storePurchase(hash: string, address: string, type: string, id: string) {
	await prisma.purchase.create({
		data: {
			authorId: address,
			type,
			itemId: id,
			transactionHash: hash
		}
	})
}

export async function hasPurchased(address: string, type: string, id: string) {
	return await prisma.purchase.count({
		where: {
			authorId: { equals: address },
			type: { equals: type },
			itemId: { equals: id }
		}
	}) > 0
}

export async function getUploaded(address: string) {
	const superContents = await prisma.superDataset.findMany({
		where: {
			authorId: { equals: address }
		},
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	const contents = await prisma.dataset.findMany({
		where: {
			authorId: { equals: address }
		},
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	return superContents.map((x: any) => ({ type: 'super', data: x })).concat(contents.map((x: any) => ({ type: 'normal', data: x })))

}

export async function getPurchases(address: string) {
	const purchases = await prisma.purchase.findMany({
		where: {
			authorId: { equals: address }
		}
	})

	const superContents = await prisma.superDataset.findMany({
		where: {
			id: { in: purchases.filter((x: any) => x.type == 'super_dataset').map((x: any) => x.itemId) },
		},
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	const contents = await prisma.dataset.findMany({
		where: {
			id: { in: purchases.filter((x: any) => x.type == 'entity').map((x: any) => x.itemId) }
		},
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	return superContents.map((x: any) => ({ type: 'super', data: x })).concat(contents.map((x: any) => ({ type: 'normal', data: x })))
}

export async function registerUsr(address: string) {
	if (await prisma.user.count({ where: { id: { equals: address} }}) > 0) return

	await prisma.user.create({
		data: {
			id: address
		}
	})
}