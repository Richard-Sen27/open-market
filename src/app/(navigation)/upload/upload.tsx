"use server"

import prisma from "@/lib/prisma"

type ModelFormProps = {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    authorId: string;
}

export async function uploadModel({ title, description, price, thumbnail, authorId }: ModelFormProps) {
    return await prisma.dataset.create({
        data: {
            title: title,
            description: description,
            price: price * 1.1 * 1.2,
            image: thumbnail,
            downloads: 0,
            authorId: authorId,
            published: true
        }
    })
}