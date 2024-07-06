import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCircleInfo } from "react-icons/fa6";
import prisma from "@/lib/prisma";
import NavTitle from "@/components/NavTitle";
import Image from "next/image";
import { IoMdDownload } from "react-icons/io";
import { numberDots } from "@/lib/utils";

export default async function Page({ params } : { params: { id: string }}) {

    const model = await prisma.dataset.findUnique({
        where: { id: params.id }
    })

    return (
        <main className="flex flex-col h-full p-6 mt-5 gap-4">
            <NavTitle 
                title={model?.title || ""} 
                breadcrumb={[
                    {label: "Browse", href: "/browse"},
                    {label: model?.title || "", href: model?.id || ""}
                ]}
            />
            <div className="flex gap-6">
                <Card>
                    <div className="h-full p-4 w-64 flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
                        <Image src={model?.image || ""} alt="" width={150} height={150} className="z-10 aspect-square"/>
                        <Image src={model?.image || ""} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-2xl opacity-50"/>
                    </div>
                </Card>
                <Card className="flex-grow">
                    <div className="flex justify-between items-center">
                        <CardHeader>
                            <CardTitle>{model?.title}</CardTitle>
                            <p className="opacity-40">by {model?.authorId}</p> 
                        </CardHeader>
                        <div className="mr-6 flex items-center gap-1 text-2xl">
                            {numberDots(model?.downloads || 0)}
                            <IoMdDownload className="text-3xl text-green-500"/>
                        </div>
                    </div>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-4 items-center">
                            <FaCircleInfo/> General Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {model?.description}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}