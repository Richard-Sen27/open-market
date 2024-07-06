import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json()
	const contents = await prisma.dataset.create({
		data: {
			published: true,
			...body
		}
	})

	return NextResponse.json(contents)
}

export async function GET(request: NextRequest) {
	const contents = await prisma.dataset.findMany({
		where: { published: true },
		include: {
			author: {
				select: { id: true }
			}
		}
	})

	return NextResponse.json(contents)
}