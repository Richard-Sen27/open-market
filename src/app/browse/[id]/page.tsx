import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCircleInfo } from "react-icons/fa6";
import prisma from "@/lib/prisma";
import NavTitle from "@/components/NavTitle";
import Image from "next/image";
import { IoMdDownload } from "react-icons/io";
import { cn, numberDots } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaEthereum } from "react-icons/fa";
import Chat from "./Chat";


export default async function Page({ params } : { params: { id: string }}) {

    const entry = await prisma.dataset.findUnique({
        where: { id: params.id }
    })

    return (
        <main className="flex flex-col h-full p-6 mt-4 gap-6">
            <NavTitle 
                title={entry?.title || ""} 
                breadcrumb={[
                    {label: "Browse", href: "/browse"},
                    {label: entry?.title || "", href: entry?.id || ""}
                ]}
            />
            <div className="flex gap-6">
                <Card>
                    <div className="h-full p-4 w-64 flex items-center justify-center relative overflow-hidden rounded-l-[calc(var(--radius)-1px)]">
                        <Image src={entry?.image || ""} alt="" width={150} height={150} className="z-10 aspect-square"/>
                        <Image src={entry?.image || ""} alt="" width={150} height={150} className="z-0 h-full aspect-square absolute top-0 left-1/2 -translate-x-1/2 blur-2xl opacity-50"/>
                    </div>
                </Card>
                <Card className="flex-grow flex flex-col justify-between">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <CardTitle>{entry?.title}</CardTitle>
                                <p className="opacity-40">by {entry?.authorId}</p> 
                            </div>
                            <div className="flex items-center gap-1 text-2xl">
                                {numberDots(entry?.downloads || 0)}
                                <IoMdDownload className="text-3xl text-green-500"/>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-auto">
                        <div className="flex justify-between">
                            <Badge variant="secondary" className="text-nowrap px-4 text-md gap-2">{entry?.price} <FaEthereum /></Badge>
                            <Button variant="default" className="max-w-32 bg-green-500 hover:bg-green-700 w-full">
                                Get { entry?.type === "DATASET" ? "Dataset" : "Model"}
                            </Button>
                        </div>  
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <Card className={cn("mb-auto", entry?.type === "MODEL" ? "col-span-2" : "col-span-3")}>
                    <CardHeader>
                        <CardTitle className="flex gap-4 items-center">
                            <FaCircleInfo/> General Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {entry?.description || ""}
                    </CardContent>
                </Card>
                { entry?.type === "MODEL" && <Chat /> }
            </div>
        </main>
    )
}