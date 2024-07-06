"use server"

import prisma from "@/lib/prisma"

type ModelFormProps = {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    authorId: string;
}

export async function UploadModel({ title, description, price, thumbnail, authorId }: ModelFormProps) {
    const f = await prisma.dataset.create({
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
    console.log("prisma return:", f)
    console.log("Model uploaded")
}