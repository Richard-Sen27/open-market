import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json()
	const contents = await prisma.superDataset.create({
		data: {
			...body
		}
	})

	return NextResponse.json(contents)
}

export async function GET(request: NextRequest) {
	const contents = await prisma.superDataset.findMany({
		include: {
			author: {
				select: { id: true }
			},
			datasets: {
				select: { id: true }
			}
		}
	})

	return NextResponse.json(contents)
}